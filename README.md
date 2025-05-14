# Book API - Jest HTTP Test (Without Supertest)

This project demonstrates how to test an Express route using Node.js's built-in `http` module instead of `supertest`. It uses **Jest** as the test runner and **TypeScript** for type safety.

---


---

## 📦 Installation

Install the required dependencies:

Create the directory book-management-api

npm init -y

## Runtime dependencies
npm install express morgan multer uuid dotenv typescript

## Dev Dependencies
npm install --save-dev jest ts-jest @types/jest typescript

## Installing ts-node
npm install -g ts-node

## Initialize Typescript
npx tsc --init

## Jest setup
npx ts-jest config:init


## Converting TS to JS
tsc

## Running the code
ts-node app.ts


🧪 Running Tests

Add this to your package.json:

"scripts": {
  "test": "jest"
}

Then run the command
npm test

