import ListJokes from "@components/ListJokes";

/**
 * Jokes home page
 * @returns Node to render home Page
 */
const Home = async () => {
  return (
    <section className="w-full flex-center flex-col mb-24">
      <h1 className="head_text text-center">
        <br className="max-md:hidden" />
      </h1>

      <ListJokes />
    </section>
  );
};

export default Home;
