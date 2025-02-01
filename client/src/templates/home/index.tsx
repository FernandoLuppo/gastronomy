import { Footer, HeaderLoggedIn } from "@/shared/components";
import { Banner, CuisineType, MealType } from "./components";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const Recommended = dynamic(
  () => import("./components").then(module => module.Recommended),
  {
    ssr: true
  }
);

const Home = () => {
  return (
    <>
      <HeaderLoggedIn />
      <main>
        <Banner />
        <Suspense fallback={<div className="loading-fallback">Loading...</div>}>
          <Recommended />
        </Suspense>

        <MealType />
        <CuisineType />
      </main>
      <Footer />
    </>
  );
};

export default Home;
