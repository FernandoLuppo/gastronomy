import { Banner, CuisineType, MealType, Recommended } from "./components";

const Home = () => {
  return (
    <>
      <main>
        <Banner />
        <Recommended />

        <MealType />
        <CuisineType />
      </main>
    </>
  );
};

export default Home;
