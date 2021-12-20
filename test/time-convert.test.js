import expect from './init-chai.js';
import { DATE_TIME_FORMAT } from '../src/constants/constants.js';
import { isDateValidate, getBeginEndDate } from '../src/utils/time-convert.js';

describe('Check date validation function', () => {
  describe('Input a character', () => {
    it('should not valid', () => {
      expect(isDateValidate('a')).to.equal(false);
    });
  });
  describe('Input an empty string', () => {
    it('should not valid', () => {
      expect(isDateValidate()).to.equal(false);
    });
  });
  describe(`Input a date with format: ${DATE_TIME_FORMAT}`, () => {
    it('should be a valid date', () => {
      expect(isDateValidate('10-14-2021')).to.equal(true);
    });
  });
});

describe('Check get start and end of date in unix', () => {
  describe(`Input a date with format: ${DATE_TIME_FORMAT}`, () => {
    it('should return correct start and end of the inputted date', () => {
      expect(getBeginEndDate('10-25-2019'))
        .to.be.a('object')
        .that.includes({ startDateUnix: 1571936400, endDateUnix: 1572022799 });
    });
  });
  describe('Input an empty string', () => {
    it('should return empty object', () => {
      expect(getBeginEndDate('')).to.be.a('object');
    });
  });
  describe('Input wrong date format', () => {
    it('should return empty object', () => {
      expect(getBeginEndDate('25-11-2019')).to.be.a('object');
    });
  });
  describe('Input a string', () => {
    it('should return empty object', () => {
      expect(getBeginEndDate('25-11-2019')).to.be.a('object');
    });
  });
});
