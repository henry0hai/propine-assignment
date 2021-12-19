import assert from 'assert';
import path from 'path';

import { getTransaction } from '../src/services/transaction.js';

// process.env.FILE_DIR=/home/henry0hai/Downloads
process.env.NODE_ENV = 'test';
process.env.FILE_NAME = "transactions-100.csv"
// process.env.CSV_HAS_HEADER=true
const fileDir = path.join(process.cwd(), '/mocks');
process.env.FILE_DIR = fileDir;

describe('Color Code Converter', () => {
  describe('RGB to Hex conversion', () => {
    it('converts the basic colors', () => {
      getTransaction().then(() => {
        console.log(process.env.FILE_DIR);
       
     })
    });
  });

  describe('Hex to RGB conversion', function () {
    it('converts the basic colors', function () {});
  });
});


describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});
