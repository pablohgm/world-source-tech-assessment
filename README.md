### Description
Technical Assessment for Wold Source.

This API was made using NestJs

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Test Endpoint
```bash
curl --location 'http://localhost:3000/mortgage/calculator' \
--header 'Content-Type: application/json' \
--data '{
    "propertyPrice": 100000,
    "downPayment": 5000,
    "annualInterestRate": 5,
    "amortizationPeriod": 5,
    "paymentSchedule": "monthly"
}'
```