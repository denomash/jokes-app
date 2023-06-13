import { makeErrorMessage } from "@utils/makeErrorMessage";
import { useMutation } from "@tanstack/react-query";

/**
 * @description Abstract the logic for making a put(update) request into a reusable function
 * @param method Method for the request
 * @param path The request's path
 * @param payload Request payload
 * @returns
 */
export function useRequest(
  method: "PUT" | "POST" | "PATCH",
  path: string,
  payload: any,
  onSuccess: Function,
  onFailure: Function
) {
  const postPutRequest = async () =>
    await fetch(path, {
      method,
      body: JSON.stringify({ ...payload }),
    });

  const mutation = useMutation(postPutRequest, {
    onSuccess: (data) => {
      onSuccess(data);
    },
    onError: (error: Response) => {
      onFailure({
        message: makeErrorMessage(error),
        statusCode: error.statusText,
      });
    },
  });

  return mutation;
}

/**
 * @description Abstract the logic for making a put(update) request into a reusable function
 * @param method Method for the request
 * @param path The request's path
 * @param payload Request payload
 * @returns
 */
export function useDeleteRequest(
  method: "DELETE",
  path: string,
  onSuccess: Function,
  onFailure: Function
) {
  const deleteRequest = () => fetch(path, { method });

  const mutation = useMutation(deleteRequest, {
    onSuccess: (data) => {
      onSuccess(data);
    },
    onError: (error: Response) => {
      onFailure({
        message: makeErrorMessage(error),
        statusCode: error.statusText,
      });
    },
  });

  return mutation;
}
