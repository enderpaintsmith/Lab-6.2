"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retryPromise = retryPromise;
const errors_1 = require("./errors");
function retryPromise(asyncFunction, retries, delay) {
    return asyncFunction().catch((error) => {
        // Only retry network-related failures
        if (!(error instanceof errors_1.NetworkError) || retries <= 0) {
            return Promise.reject(error);
        }
        console.log(`Request failed. Retrying in ${delay}ms...`);
        return new Promise((resolve) => {
            setTimeout(resolve, delay);
        }).then(() => {
            return retryPromise(asyncFunction, retries - 1, delay);
        });
    });
}
