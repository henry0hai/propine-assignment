# propine-assignment

Propine Blockchain Engineer Assignment

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

- Update unit test to covert all functions and missing case
