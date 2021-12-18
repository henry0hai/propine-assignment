import moment from 'moment';

import { DATE_TIME_FORMAT } from '../constants/constants.js';

export const getBeginEndDate = (inputDate) => {
  if (inputDate) {
    const convertDateToUnix = moment(inputDate, DATE_TIME_FORMAT);
    const startDateUnix = moment(convertDateToUnix).startOf('day').unix();
    const endDateUnix = moment(convertDateToUnix).endOf('day').unix();
    return { startDateUnix, endDateUnix };
  }
  return {};
};

export const compareDateIsAfter = (unixDate, compareDate) => {
  const compareUnixDate = moment.unix(compareDate).unix();
  return Number(unixDate) <= Number(compareUnixDate);
};

export const compareDateIsBefore = (unixDate, compareDate) => {
  const compareUnixDate = moment.unix(compareDate).unix();
  return Number(unixDate) >= Number(compareUnixDate);
};
