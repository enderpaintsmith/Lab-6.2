import { NetworkError } from "./errors";

export function retryPromise<T>(
  asyncFunction: () => Promise<T>,
  retries: number,
  delay: number
): Promise<T> {
  return asyncFunction().catch((error: unknown) => {
    // Only retry network-related failures
    if (!(error instanceof NetworkError) || retries <= 0) {
      return Promise.reject(error);
    }

    console.log(`Request failed. Retrying in ${delay}ms...`);

    return new Promise<void>((resolve) => {
      setTimeout(resolve, delay);
    }).then(() => {
      return retryPromise(asyncFunction, retries - 1, delay);
    });
  });
}