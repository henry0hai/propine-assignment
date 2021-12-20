# propine-assignment

Propine Blockchain Engineer Assignment

## Questions

_We're looking at your programming ability. It must not only work, it should be maintainable._

Let us assume you are a crypto investor. You have made transactions over a period of time which is logged in a [CSV file](https://s3-ap-southeast-1.amazonaws.com/static.propine.com/transactions.csv.zip). Write a command line program that does the following

- Given no parameters, return the latest portfolio value per token in USD
- Given a token, return the latest portfolio value for that token in USD
- Given a date, return the portfolio value per token in USD on that date
- Given a date and a token, return the portfolio value of that token in USD on that date

The CSV file has the following columns

- timestamp: Integer number of seconds since the Epoch
- transaction_type: Either a DEPOSIT or a WITHDRAWAL
- token: The token symbol
- amount: The amount transacted

Portfolio means the balance of the token where you need to add deposits and subtract withdrawals. You may obtain the exchange rates from [cryptocompare](https://min-api.cryptocompare.com/) where the API is free. You should write it in Node.js as our main stack is in Javascript/Typescript and we need to assess your proficiency.

## Usage

- Change `.default.env` to `.env` and check **environment** variables

- Install all missing package by run this command blow in terminal

```sh
yarn
```

- At the project's root, in terminal run application by

```sh
node .
```

- For unit test run by

```sh
yarn test
```

## Project directories

```txt
├── LICENSE
├── main.js
├── package.json
├── README.md
├── src
│  ├── api
│  │   └── currency.js
│  ├── constants
│  │   └── constants.js
│  ├── services
│  │   ├── parse-content.js
│  │   ├── read-file.js
│  │   └── transaction.js
│  └── utils
│      ├── color.js
│      ├── menu.js
│      └── time-convert.js
├── test
│   ├── init-chai.js
│   ├── mocks
│      └── transactions-100.csv
│   ├── transaction.test.js
│   └── time-convert.test.js
└── .default.env
```

## Thing need to improve

- Speed up processing large data from parse file to get some object transformation

  - Apply thread, child process while processing data
  - Snapshot while reading (by time range) => using redis cached and from now, read from cache

- Update unit test to cover all functions and missing case
