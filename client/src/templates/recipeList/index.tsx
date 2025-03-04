import Image from "next/image";
import { Banner, List, Nav } from "./components";
import { pageContent, recipeListDataFormatter } from "./utils";

const RecipeList = ({
  params
}: {
  params: { recipeType: string; dishType: string };
}) => {
  const content = pageContent({ params });
  const { options, path, upperCasePath, dishTypePath } =
    recipeListDataFormatter({ content });

  return (
    <main className="min-h-screen">
      <Banner type={content.recipeType}>
        <div className="flex items-baseline gap-5 md:gap-10">
          <h1 className="text-3xl md:text-7xl text-default-white dark:text-default-white">
            {path}
          </h1>
          <Image
            src="/icons/recipeList/turkey.svg"
            alt="Turkey icon"
            width={60}
            height={60}
            className="w-8 h-8 md:w-[60px] md:h-[60px]"
          />
        </div>
      </Banner>
      <Nav
        upperCasePath={upperCasePath}
        dishTypePath={dishTypePath}
        options={options}
      />
      <div className="px-6 md:px-12">
        <div className="w-full h-[2px] rounded-xl bg-placeholder"></div>
      </div>
      <List recipeType={content.recipeType} dishType={content.dishType} />
    </main>
  );
};

export default RecipeList;
