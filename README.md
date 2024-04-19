# Express TS Boilerplate

## Introduction

This is a minimal boilerplate for messing with Express and Typescript. Both frontend and backend live reload.

Ngrok is thrown in too, in case you want to use it for some reason (e.g. testing webhooks).

## Usage

1. Install dependencies with `yarn` or `npm`.
2. Secondly, rename the `example.env` file to `.env` and fill in the desired port.
3. Run the app with one of the two following commands:
    - `npm run watch` or `yarn watch` to run the app with live reload.
    - `npm run build && npm start` or `yarn build && yarn start` to run the app without live reload.
4. If you want to use ngrok, run `npm run ngrok` or `yarn ngrok` in a separate terminal.
