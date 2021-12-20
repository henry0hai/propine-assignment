import moment from 'moment';

import { DATE_TIME_FORMAT } from '../constants/constants.js';

const regexDateFormatMMDDYYYY = /^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-\d{4}$/; //MM-DD-YYYY

export const isDateValidate = (inputDate) => {
  try {
    if (!inputDate.match(regexDateFormatMMDDYYYY)) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}

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
