# Lab 6.2 — Promises and Error Handling Challenge

## Project Overview

For this lab, I built a simple e-commerce dashboard simulation using TypeScript to practice asynchronous programming, Promises, and error handling. The application simulates API requests to retrieve a product catalog, customer reviews, and a sales report.

The main objective was to understand how to manage multiple asynchronous operations, handle errors when requests fail, and make sure the application can continue functioning when something goes wrong.

## Technologies Used

This project was built using TypeScript, JavaScript, Node.js, and npm. I used VS Code for development and Git and GitHub for version control.

## Features and Functionality

The application uses three simulated API functions to retrieve product information, customer reviews, and sales data. Each function returns a Promise and uses `setTimeout()` to simulate the delay of an actual API request.

I used `.then()` to handle successful requests, `.catch()` to manage errors, and `.finally()` to confirm that the requests have finished.

The application also includes custom `NetworkError` and `DataError` classes to distinguish between different types of failures. I implemented a recursive retry function that automatically retries a failed network request up to three times before reporting an error.

The dashboard displays the results in the terminal using `console.table()`, which makes the data easier to read.

## Development Process

I started by setting up the TypeScript project and configuring the compiler. From there, I created the simulated API functions and defined interfaces for the product, review, and sales report data.

Once the individual functions were working, I connected them using Promise chaining and added error handling so that a failed request wouldn't necessarily stop the rest of the application.

After that, I added the retry function and tested the application under different conditions to make sure it could recover from temporary network failures.

## Challenges and What I Learned

One of the first issues I encountered was a TypeScript compiler error caused by an outdated module resolution setting. I updated the configuration to use Node16, which resolved the issue and allowed the project to compile.

Another challenge was understanding how to handle multiple asynchronous requests without having one failure interrupt everything else. Working with Promise chaining and `Promise.all()` helped me better understand how JavaScript manages operations that don't necessarily finish in the order they start.

I also spent time testing the error-handling functionality by intentionally forcing requests to fail. I confirmed that the retry function stopped after three retries, that invalid data triggered a `DataError`, and that the application could continue loading the sales report even when the product catalog failed.

Overall, this lab helped me get more comfortable working with Promises, asynchronous operations, and handling errors in TypeScript.

## Running the Project

To run the project locally, clone the repository and install the dependencies using `npm install`.

Compile the TypeScript files with:

`npx tsc`

Then run the application using:

`node dist/index.js`

Since the API requests are simulated and have a random chance of failing, the results may vary between runs. The application will automatically retry temporary# Lab6.2
