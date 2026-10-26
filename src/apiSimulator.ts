import { NetworkError, DataError } from "./errors";

export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface Review {
  productId: number;
  reviewer: string;
  rating: number;
  comment: string;
}

export interface SalesReport {
  totalSales: number;
  unitsSold: number;
  averagePrice: number;
}

// Fetch product catalog
export const fetchProductCatalog = (): Promise<Product[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0) {
        const products: Product[] = [
          { id: 1, name: "Laptop", price: 1200 },
          { id: 2, name: "Headphones", price: 200 },
        ];

        if (products.some(product => !product.name || !Number.isFinite(product.price))) {
          reject(new DataError("Product catalog contains invalid data"));
          return;
        }

        resolve(products);
      } else {
        reject(new NetworkError("Failed to fetch product catalog"));
      }
    }, 1000);
  });
};

// Fetch product reviews
export const fetchProductReviews = (
  productId: number
): Promise<Review[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!Number.isInteger(productId) || productId <= 0) {
        reject(new DataError("Invalid product ID"));
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
      } else {
        reject(
          new NetworkError(
            `Failed to fetch reviews for product ID ${productId}`
          )
        );
      }
    }, 1500);
  });
};

// Fetch sales report
export const fetchSalesReport = (): Promise<SalesReport> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.8) {
        const report: SalesReport = {
          totalSales: 5600,
          unitsSold: 10,
          averagePrice: 560,
        };

        if (report.unitsSold <= 0 || !Number.isFinite(report.totalSales)) {
          reject(new DataError("Sales report contains invalid data"));
          return;
        }

        resolve(report);
      } else {
        reject(new NetworkError("Failed to fetch sales report"));
      }
    }, 1000);
  });
};