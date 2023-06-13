"use client";

import Loader from "@components/Common/Loader";
import CreateUpdateJoke from "@components/CreateUpdateJoke";
import useFetch from "@hooks/useFetch";
import { JokeProps } from "@models/Joke";
import { PageProps } from "@models/PageProps";

/**
 * Edit delete single joke
 * @param {PageProps} params
 * @returns Node to display joke
 */
const Page = ({ params }: PageProps) => {
  const { data, isLoading } = useFetch<JokeProps>(`/api/jokes/${params.id}`, [
    `joke-${params.id}`,
  ]);

  if (isLoading) return <Loader />;

  return <CreateUpdateJoke data={data} />;
};

export default Page;
