import {
  fetchProductCatalog,
  fetchProductReviews,
  fetchSalesReport,
} from "./apiSimulator";

import { NetworkError, DataError } from "./errors";
import { retryPromise } from "./retryPromise";

function handleError(error: unknown): void {
  if (error instanceof NetworkError) {
    console.error("Network Error:", error.message);
  } else if (error instanceof DataError) {
    console.error("Data Error:", error.message);
  } else {
    console.error("Unexpected Error:", error);
  }
}

function loadDashboard(): void {
  console.log("Loading E-Commerce Dashboard...\n");

  retryPromise(fetchProductCatalog, 3, 1000)
    .then((products) => {
      console.log("PRODUCT CATALOG");
      console.table(products);

      // Fetch reviews for each product
      const reviewRequests = products.map((product) => {
        return retryPromise(
          () => fetchProductReviews(product.id),
          3,
          1000
        )
          .then((reviews) => {
            console.log(`Reviews for ${product.name}:`);
            console.table(reviews);
          })
          .catch((error: unknown) => {
            handleError(error);
          });
      });

      return Promise.all(reviewRequests);
    })
    .catch((error: unknown) => {
      // Handle catalog errors without preventing the sales report
      handleError(error);
    })
    .then(() => {
      console.log("\nSALES REPORT");

      return retryPromise(fetchSalesReport, 3, 1000)
        .then((report) => {
          console.table(report);
        })
        .catch((error: unknown) => {
          handleError(error);
        });
    })
    .finally(() => {
      console.log("\nAll API calls have been attempted.");
      console.log("Dashboard loading complete.");
    });
}

loadDashboard();