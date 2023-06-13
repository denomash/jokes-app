/**
 * @description Attempt to make a useful error message from the API error
 * @param {Response} error The api error
 * @return {string}
 */
export const makeErrorMessage = (error: Response) => {
  console.log("*** ERROR:", error)
  if (error.status === 404) {
    return error.statusText || "Resource not found";
  }

  if (error.status === 400) {
    return error.statusText || "Bad request";
  }

  if (error.statusText) {
    return error.statusText;
  }

  return `${error.statusText}` || "Something went wrong";
};
