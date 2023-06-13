"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

import useFetch from "@hooks/useFetch";
import { JokeProps } from "@models/Joke";
import Table from "./Common/Table/Table";
import TableHead from "./Common/Table/TableHead";
import TableRow from "./Common/Table/TableRow";
import TableHeader from "./Common/Table/TableHeader";
import TableBody from "./Common/Table/TableBody";
import TableCell from "./Common/Table/TableCell";
import Loader from "./Common/Loader";
import { formatShort } from "@utils/dateTimeHelper";
import { maskEmail } from "@utils/maskEmail";
import Search from "./Common/Search";
import Button from "./Common/Button/Button";
import { useRouter } from "next/navigation";

/**
 * Get display color
 * @param views Number of view
 * @returns The color to show
 */
const getViewsColor = (views: number): string => {
  if (views >= 0 && views <= 25) return "tomato";
  if (views >= 26 && views <= 50) return "orange";
  if (views >= 51 && views <= 75) return "yellow";
  if (views >= 76 && views <= 100) return "tomato";

  return "";
};

/**
 * List Jokes Compenent
 */
const ListJokes = () => {
  const router = useRouter();

  /**
   * Current page
   */
  const [page, setPage] = useState(1);

  /**
   * Page limit
   */
  const [limit, setLimit] = useState(10);

  /**
   * Search
   */
  const [searchValue, setSearchValue] = useState("");

  const { data, isLoading, error } = useFetch<JokeProps[]>(
    `/api/jokes?page=${page}&limit=${limit}`,
    ["jokes", `${page}`, `${limit}`]
  );

  // Get QueryClient from the context
  const queryClient = useQueryClient();

  /**
   * Jokes lost
   */
  const [jokesList, setJokesList] = useState<JokeProps[]>([]);

  const handleSortBy = (
    data: JokeProps[],
    sortValue: "Views" | "CreatedAt"
  ) => {
    const sorted = [...data].sort((a, b) => {
      const valueA = a[`${sortValue}`] ?? a[`${sortValue.toLowerCase()}`];
      const valueB = b[`${sortValue}`] ?? b[`${sortValue.toLowerCase()}`];

      return Number(valueB ?? 0) - Number(valueA ?? 0);
    });

    setJokesList(() => sorted);
  };

  useEffect(() => {
    setJokesList(data ?? []);
  }, [data]);

  /**
   * Handle next page
   */
  const handleNext = () => {
    // Invalidate and refetch
    queryClient.invalidateQueries({ queryKey: ["jokes"] });
    setPage((prev) => prev + 1);
  };

  /**
   * Handle previous page
   */
  const handlePrevious = () => {
    // Invalidate and refetch
    queryClient.invalidateQueries({ queryKey: ["jokes"] });
    if (page === 1) return;
    setPage((prev) => prev - 1);
  };

  const onSearch = (val: string) => {
    console.log({ val });
    setSearchValue(val);
  };

  const handleChange = (searchVal: "Views" | "CreatedAt") =>
    handleSortBy(data ?? [], searchVal);

  return (
    <>
      <div className="flex items-center justify-between w-full px-6">
        <h1 className=" mt-5 text-3xl font-extrabold leading-[1.15] text-black dark:text-white">
          Jokes
          <br className="max-md:hidden" />
        </h1>
        <div className="flex items-center">
          <Button
            display="primary"
            className="mr-6"
            onClick={() => router.push("/new")}
          >
            Create Joke
          </Button>
          <Search value={searchValue} onSearch={onSearch} />

          <div className="py-3 px-4 ml-3 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
            <p>Sort By:</p>
            <select
              className="focus:outline-none bg-transparent ml-1"
              onChange={(e) => {
                handleChange(e.target.value as "Views" | "CreatedAt");
              }}
            >
              <option className="text-sm text-indigo-800" defaultValue="">
                None
              </option>
              <option className="text-sm text-indigo-800" value="Views">
                Views
              </option>
              <option className="text-sm text-indigo-800" value="CreatedAt">
                Created Date
              </option>
            </select>
          </div>
        </div>
      </div>
      <Table className="mt-6">
        <TableHead>
          <TableRow>
            <TableHeader>Title</TableHeader>
            <TableHeader>Author</TableHeader>
            <TableHeader>Created Date</TableHeader>
            <TableHeader>Views</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={4}>
                <Loader />
              </TableCell>
            </TableRow>
          ) : (
            jokesList.map((joke) => (
              <TableRow key={joke.id}>
                <TableCell>
                  <Link
                    className="text-cyan-500 underline underline-offset-4"
                    href={`/${joke.id}`}
                  >
                    {joke.Title || joke.title || "-"}
                  </Link>
                </TableCell>
                <TableCell>
                  {maskEmail(joke.Author || joke.author) || "-"}
                </TableCell>
                <TableCell>
                  {formatShort(joke.CreatedAt || joke.createdAt) || "-"}
                </TableCell>
                <TableCell
                  style={{
                    color: getViewsColor(joke.Views),
                  }}
                >
                  {joke.Views || "-"}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Pagination Button */}
      <div className="flex w-full justify-center mt-6">
        <div
          className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <div
            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            onClick={handlePrevious}
          >
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </div>

          <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
            <select
              className="border border-gray-300 text-black-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => setLimit(Number(e.target.value))}
            >
              <option defaultValue={5}>Items to view per page</option>
              <option value="5">5 items per page</option>
              <option value="10">10 items per page</option>
            </select>
          </span>
          <div
            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            onClick={handleNext}
          >
            <span className="sr-only">Next</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ListJokes;
