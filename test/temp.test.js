import assert from 'assert';
import path from 'path';

import { getLines } from '../src/services/read-file.js';
import { getTransaction } from '../src/services/transaction.js';

const fileName = "transactions-100.csv"
const fileDir = path.join(process.cwd(), '/test/mocks', fileName);

describe('Color Code Converter', () => {
  describe('RGB to Hex conversion', () => {
    it('converts the basic colors', () => {
      getTransaction(getLines(fileDir)).then((result) => {
        console.log("🚀 ~ file: temp.test.js ~ line 15 ~ getTransaction ~ result", result)
      });
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
