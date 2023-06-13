import { useQuery } from "@tanstack/react-query";

import { makeErrorMessage } from "@utils/makeErrorMessage";
import { ErrorType } from "@models/ErrorType";
import api from "@utils/api";

export interface FetchResults<T> {
  isLoading: boolean;
  isRefreshing: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: false | ErrorType;
  data: T | undefined;
}

/**
 * @description Abstract fetch logic that affects state into a reusable hook
 * @param  {string} path From whence to fetch
 * @param {string | string[]} name  Unique identifier for what's being fetched, for caching purposes
 * @param  {Objec} args extra configs

 * @return {FetchResults} State changes across the fetch cycle
 */
export default function useFetch<T>(
  path: string,
  name: string[],
  args?: { [key: string]: any }
): FetchResults<T> {
  const {
    isLoading,
    isSuccess,
    isError,
    isFetching: isRefreshing,
    data,
    error,
  } = useQuery<T>(
    name,
    async () => {
      const res = await api.get(path);
      return res.data;
    },
    {
      retry: (failureCount, err) => false,
      ...args,
      ...(args?.onError && {
        onError: (err: Response) => {
          console.log({ error: err });
          args.onError({
            message: makeErrorMessage(err),
            statusCode: err.statusText,
          });
        },
      }),
    }
  );

  return {
    isLoading,
    isRefreshing,
    isSuccess,
    isError,
    data,
    error: {
      message: error ? makeErrorMessage(error as Response) : "",
      statusCode: (error as Response)?.status || 0,
    },
  };
}
