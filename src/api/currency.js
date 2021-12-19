import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_URL = process.env.CRYPTO_COMPARE_API_GET_PRICE;
const API_KEY = process.env.CRYPTO_COMPARE_API_KEY;
const EXCHANGE_CURRENCY = process.env.DEFAULT_EXCHANGE_CURRENCY;

const instance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: { Apikey: API_KEY },
});

const getCurrentExchangeRateByToken = async (token, balance) => {
  try {
    const responseData = await instance.get('/price', {
      params: {
        fsym: token,
        tsyms: EXCHANGE_CURRENCY,
      },
    });
    if (responseData.data) {
      const result = responseData.data;
      return `${Number(result[EXCHANGE_CURRENCY] * balance).toFixed(6)} ${EXCHANGE_CURRENCY}`;
    }
    return `${-1} ${EXCHANGE_CURRENCY}`;
  } catch (error) {
    console.error('🚀 ~ getCurrentExchangeRateByToken ~ error: ', error);
    return `${-1} ${EXCHANGE_CURRENCY}`;
  }
};

export const transformPortfoliosGetPrice = async (portfolios) => {
  if (Array.isArray(portfolios)) {
    var promises = portfolios.map(async (portfolio) => {
      portfolio.price = await getCurrentExchangeRateByToken(portfolio.token, portfolio.balance);
      return portfolio;
    });
    return await Promise.all(promises);
  }
  const portfolio = portfolios;
  portfolio.price = await getCurrentExchangeRateByToken(portfolio.token, portfolio.balance);
  return portfolio;
};
