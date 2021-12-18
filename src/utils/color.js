import chalk from 'chalk';
import boxen from 'boxen';

const log = console.log;

export const withColor = (msg, color) => {
  return chalk.hex(color).bold(msg);
};

export const logWithColor = (msg, color) => {
  return log(withColor(msg, color));
};

export const createBox = (msg, borderStyle, color, backgroundColor) => {
  const message = chalk.green.bold(msg);

  const boxenOptions = {
    padding: 1,
    margin: 1,
    borderStyle: borderStyle,
    borderColor: color,
    backgroundColor: backgroundColor,
  };
  const msgBox = boxen(message, boxenOptions);
  log(msgBox);
};
