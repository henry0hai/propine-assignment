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
└── .default.env
```

## Thing need to improve

- Handle multi thread to improve processing large data from parse file to get some object transformation

