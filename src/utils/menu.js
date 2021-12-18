import ora from 'ora';
import inquirer from 'inquirer';

import { createBox, logWithColor } from './color.js';
import { getTransaction } from '../services/transaction.js';
import { DATE_TIME_FORMAT } from '../constants/constants.js';
import { GET_TOKEN, GET_DATE, GET_TOKEN_DATE } from '../constants/constants.js';

const menus = [
  {
    type: 'list',
    name: 'options',
    message: createBox(`Crypto Assignment`, 'round', 'green', '#263238'),
    choices: [
      '-- With no parameter --',
      '-- With a token      --',
      '-- With a date       --',
      '-- With date & token --',
      '-- Exit Program      --',
    ],
  },
];

const dateValidate = async (input) => {
  const regex = /^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-\d{4}$/;
  if (!input.match(regex)) {
    return `Please input correct date format (${DATE_TIME_FORMAT})`;
  }
  return true;
};

const defaultQuestion = {
  type: 'input',
  name: 'default',
  message: 'Are you sure? (Y/n)',
  filter: async (answer) => {
    if (answer.length === 0 || answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
      return JSON.stringify(await getTransaction());
    }
  },
  filteringText: 'Get Result:...',
};

const tokenQuestion = {
  type: 'input',
  name: 'token',
  message: 'Input a token (BTC, ETH,...):',
  filter: async (answer) => {
    return JSON.stringify(await getTransaction(GET_TOKEN, { inputToken: answer.toUpperCase() }));
  },
  filteringText: 'Get Result:...',
};

const dateQuestion = {
  type: 'input',
  name: 'date',
  message: `Input a date (${DATE_TIME_FORMAT}):`,
  validate: dateValidate,
  validatingText: 'Validating date...',
};

const tokenAndDateQuestion = [
  {
    type: 'input',
    name: 'token',
    message: 'Input a token (BTC, ETH,...):',
  },
  {
    type: 'input',
    name: 'date',
    message: `Input a date (${DATE_TIME_FORMAT}):`,
    validate: dateValidate,
    validatingText: 'Validating date...',
  },
];

const initMenu = () => {
  inquirer.prompt(menus).then((choice) => {
    switch (choice.options) {
      case '-- With no parameter --':
        inquirer.prompt([defaultQuestion]).then((answer) => {
          console.log('🚀 ~ result: ', answer.default);
          initMenu();
        });
        break;
      case '-- With a token      --':
        inquirer.prompt([tokenQuestion]).then((answer) => {
          console.log('🚀 ~ result: ', answer.token);
          initMenu();
        });
        break;
      case '-- With a date       --':
        inquirer.prompt([dateQuestion]).then(async (answer) => {
          const inputDate = answer.date;
          const spinner = ora('Get Result:...').start();
          const result = await getTransaction(GET_DATE, { inputDate });
          spinner.stop();
          console.log('🚀 ~ result: ', result);
          initMenu();
        });
        break;
      case '-- With date & token --':
        inquirer.prompt(tokenAndDateQuestion).then(async (answer) => {
          const inputToken = answer.token.toUpperCase();
          const inputDate = answer.date;
          const spinner = ora('Get Result:...').start();
          const result = await getTransaction(GET_TOKEN_DATE, { inputToken, inputDate });
          spinner.stop();
          console.log('🚀 ~ result: ', result);
          initMenu();
        });
        break;
      default:
        logWithColor('Have a good day.', '#FFD122');
        process.exit(1);
    }
  });
};

export default initMenu;
