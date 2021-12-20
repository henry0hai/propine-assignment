import path from 'path';

import expect from './init-chai.js';
import { getLines } from '../src/services/read-file.js';
import { getTransaction } from '../src/services/transaction.js';
import { DATE_TIME_FORMAT, GET_TOKEN, GET_DATE, GET_TOKEN_DATE } from '../src/constants/constants.js';

const fileName = 'transactions-10.csv';
const fileDir = path.join(process.cwd(), '/test/mocks', fileName);

describe('Check get data read from file & transaction function', async () => {
  describe('Default case', async () => {
    it('should return an array object', async () => {
      const response = await getTransaction(getLines(fileDir));
      expect(response).to.be.an('array');
    });
  });
  describe('Token case', async () => {
    it('input exited token => should return object content that token', async () => {
      const response = await getTransaction(getLines(fileDir), GET_TOKEN, { inputToken: 'BTC' });
      expect(response.token).to.equal('BTC');
      expect(Number(response.balance)).to.equal(0);
    });
    it('input new token => create object contain that token and set value to default', async () => {
      const response = await getTransaction(getLines(fileDir), GET_TOKEN, { inputToken: 'ADA' });
      expect(response.token).to.equal('ADA');
      expect(Number(response.balance)).to.equal(0);
    });
    it('empty token => should return empty object', async () => {
      const response = await getTransaction(getLines(fileDir), GET_TOKEN, { inputToken: '' });
      expect(response).to.be.eql({});
    });
  });
  describe('Date case', async () => {
    it(`input a date with format: ${DATE_TIME_FORMAT} exist in file => should return an array object`, async () => {
      const response = await getTransaction(getLines(fileDir), GET_DATE, { inputDate: '10-25-2019' });
      expect(response).to.be.an('array');
    });
    it(`input a date with format: ${DATE_TIME_FORMAT} not in file => should return an empty array`, async () => {
      const response = await getTransaction(getLines(fileDir), GET_DATE, { inputDate: '10-26-2019' });
      expect(response).to.be.an('array').that.eql([]);
    });
    it(`input a date with wrong format => should return an empty array`, async () => {
      const response = await getTransaction(getLines(fileDir), GET_DATE, { inputDate: '10-26-2019' });
      expect(response).to.be.an('array').that.eql([]);
    });
  });
  describe('Token & Date case', async () => {
    it(`input a token and a date with format: ${DATE_TIME_FORMAT} exist in file => should return a object`, async () => {
      const response = await getTransaction(getLines(fileDir), GET_TOKEN_DATE, {
        inputToken: 'BTC',
        inputDate: '10-25-2019',
      });
      expect(response).to.be.an('object');
      expect(response.token).to.be.equal('BTC');
    });
    it(`input a token and a date with format: ${DATE_TIME_FORMAT} not in file => should return a token with balance 0`, async () => {
      const response = await getTransaction(getLines(fileDir), GET_TOKEN_DATE, {
        inputToken: 'ADA',
        inputDate: '10-26-2019',
      });
      expect(response).to.be.an('object');
      expect(response.token).to.be.equal('ADA');
      expect(response.balance).to.be.equal(0);
    });
    it(`input a token and date with wrong format => should return a token with balance 0`, async () => {
      const response = await getTransaction(getLines(fileDir), GET_TOKEN_DATE, {
        inputToken: 'BTC',
        inputDate: '25-10-2019',
      });
      expect(response).to.be.an('object');
      expect(response.token).to.be.equal('BTC');
      expect(response.balance).to.be.equal(0);
    });
  });
});
