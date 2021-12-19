import events from 'events';
import dotenv from 'dotenv';
import es from 'event-stream';

import parseContent from './parse-content.js';
import { transformPortfoliosGetPrice } from '../api/currency.js';
import { GET_TOKEN, GET_DATE, GET_TOKEN_DATE } from '../constants/constants.js';
import { getBeginEndDate, compareDateIsAfter, compareDateIsBefore } from '../utils/time-convert.js';

dotenv.config();
const csvHeader = process.env.CSV_HAS_HEADER;

let totalLines = 0;

let sum = {};

const resetValue = () => {
  totalLines = 0;
  sum = {};
};

const createNewPortfolio = (token) => {
  return { token, balance: 0 };
};

const handleCase = (line, options, eventEmitter) => {
  const transaction = parseContent(line);
  let inputDate = '';
  let beginEndOfDate = {};
  switch (options.key) {
    case GET_TOKEN:
      if (options.value.inputToken === transaction.token) {
        eventEmitter.emit('data', transaction);
      }
      break;
    case GET_DATE:
      inputDate = options.value.inputDate;
      beginEndOfDate = getBeginEndDate(inputDate);
      if (
        compareDateIsBefore(beginEndOfDate.endDateUnix, transaction.timestamp) &&
        compareDateIsAfter(beginEndOfDate.startDateUnix, transaction.timestamp)
      ) {
        eventEmitter.emit('data', transaction);
      }
      break;
    case GET_TOKEN_DATE:
      inputDate = options.value.inputDate;
      beginEndOfDate = getBeginEndDate(inputDate);
      if (
        options.value.inputToken === transaction.token &&
        compareDateIsBefore(beginEndOfDate.endDateUnix, transaction.timestamp) &&
        compareDateIsAfter(beginEndOfDate.startDateUnix, transaction.timestamp)
      ) {
        eventEmitter.emit('data', transaction);
      }
      break;
    default:
      eventEmitter.emit('data', transaction);
      break;
  }
};

const transaction = (lines, options) => {
  const eventEmitter = new events.EventEmitter();
  lines.pipe(
    es
      .mapSync((line) => {
        if (line.length > 0) {
          totalLines++;
          if (csvHeader) {
            if (totalLines > 1) {
              handleCase(line, options, eventEmitter);
            }
          } else {
            handleCase(line, options, eventEmitter);
          }
        }
      })
      .on('error', (err) => {
        console.error(err);
      })
      .on('end', () => {
        console.log('\nRead all file done.');
        console.log(`Total lines:  ${csvHeader ? totalLines - 1 : totalLines}`);
        eventEmitter.emit('end', options);
      }),
  );
  return eventEmitter;
};

const getPortfolio = (type, token, amount) => {
  if (!sum[token]) {
    sum[token] = 0;
  }
  if (type === 'DEPOSIT') {
    sum[token] = sum[token] + Number(amount);
  }
  if (type === 'WITHDRAWAL') {
    sum[token] = sum[token] - Number(amount);
  }
  return sum;
};

export const getTransaction = (lines, key, value) => {
  return new Promise((resolve, reject) => {
    return transaction(lines, { key, value })
      .on('data', (trans) => {
        getPortfolio(trans.type, trans.token, trans.amount);
      })
      .on('end', async (options) => {
        let results = Object.keys(sum).map((token) => ({ token, balance: Number(sum[token]).toFixed(6) }));
        if (results.length === 0) {
          createNewPortfolio(options.value.inputToken);
        }
        resetValue(); // reset initial values
        let response = undefined;
        switch (options.key) {
          case GET_TOKEN:
            if (results.length === 0) {
              results.push(createNewPortfolio(options.value.inputToken));
            }
            response = await transformPortfoliosGetPrice(results[0]);
            resolve(response);
            return response;
          case GET_DATE:
            response = await transformPortfoliosGetPrice(results);
            resolve(response);
            return response;
          case GET_TOKEN_DATE:
            if (results.length === 0) {
              results.push(createNewPortfolio(options.value.inputToken));
            }
            response = await transformPortfoliosGetPrice(results[0]);
            resolve(response);
            return response;
          default:
            response = await transformPortfoliosGetPrice(results);
            resolve(response);
            return response;
        }
      })
      .on('error', (e) => {
        reject(e);
      });
  });
};
