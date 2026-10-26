"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apiSimulator_1 = require("./apiSimulator");
const errors_1 = require("./errors");
const retryPromise_1 = require("./retryPromise");
function handleError(error) {
    if (error instanceof errors_1.NetworkError) {
        console.error("Network Error:", error.message);
    }
    else if (error instanceof errors_1.DataError) {
        console.error("Data Error:", error.message);
    }
    else {
        console.error("Unexpected Error:", error);
    }
}
function loadDashboard() {
    console.log("Loading E-Commerce Dashboard...\n");
    (0, retryPromise_1.retryPromise)(apiSimulator_1.fetchProductCatalog, 3, 1000)
        .then((products) => {
        console.log("PRODUCT CATALOG");
        console.table(products);
        // Fetch reviews for each product
        const reviewRequests = products.map((product) => {
            return (0, retryPromise_1.retryPromise)(() => (0, apiSimulator_1.fetchProductReviews)(product.id), 3, 1000)
                .then((reviews) => {
                console.log(`Reviews for ${product.name}:`);
                console.table(reviews);
            })
                .catch((error) => {
                handleError(error);
            });
        });
        return Promise.all(reviewRequests);
    })
        .catch((error) => {
        // Handle catalog errors without preventing the sales report
        handleError(error);
    })
        .then(() => {
        console.log("\nSALES REPORT");
        return (0, retryPromise_1.retryPromise)(apiSimulator_1.fetchSalesReport, 3, 1000)
            .then((report) => {
            console.table(report);
        })
            .catch((error) => {
            handleError(error);
        });
    })
        .finally(() => {
        console.log("\nAll API calls have been attempted.");
        console.log("Dashboard loading complete.");
    });
}
loadDashboard();
