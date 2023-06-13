"use client";

import CreateUpdateJoke from "@components/CreateUpdateJoke";

/**
 * Create new joke
 * @param {PageProps} params
 * @returns Node to display joke
 */
const CreateJoke = () => {
  return <CreateUpdateJoke type="create" />;
};

export default CreateJoke;
