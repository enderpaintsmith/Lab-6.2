"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchSalesReport = exports.fetchProductReviews = exports.fetchProductCatalog = void 0;
const errors_1 = require("./errors");
// Fetch product catalog
const fetchProductCatalog = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0) {
                const products = [
                    { id: 1, name: "Laptop", price: 1200 },
                    { id: 2, name: "Headphones", price: 200 },
                ];
                if (products.some(product => !product.name || !Number.isFinite(product.price))) {
                    reject(new errors_1.DataError("Product catalog contains invalid data"));
                    return;
                }
                resolve(products);
            }
            else {
                reject(new errors_1.NetworkError("Failed to fetch product catalog"));
            }
        }, 1000);
    });
};
exports.fetchProductCatalog = fetchProductCatalog;
// Fetch product reviews
const fetchProductReviews = (productId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!Number.isInteger(productId) || productId <= 0) {
                reject(new errors_1.DataError("Invalid product ID"));
                return;
            }
            if (Math.random() < 0.8) {
                resolve([
                    {
                        productId,
                        reviewer: "Alex",
                        rating: 5,
                        comment: "Great product!",
                    },
                    {
                        productId,
                        reviewer: "Jordan",
                        rating: 4,
                        comment: "Good quality for the price.",
                    },
                ]);
            }
            else {
                reject(new errors_1.NetworkError(`Failed to fetch reviews for product ID ${productId}`));
            }
        }, 1500);
    });
};
exports.fetchProductReviews = fetchProductReviews;
// Fetch sales report
const fetchSalesReport = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.8) {
                const report = {
                    totalSales: 5600,
                    unitsSold: 10,
                    averagePrice: 560,
                };
                if (report.unitsSold <= 0 || !Number.isFinite(report.totalSales)) {
                    reject(new errors_1.DataError("Sales report contains invalid data"));
                    return;
                }
                resolve(report);
            }
            else {
                reject(new errors_1.NetworkError("Failed to fetch sales report"));
            }
        }, 1000);
    });
};
exports.fetchSalesReport = fetchSalesReport;
