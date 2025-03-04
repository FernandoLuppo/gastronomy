import { RecipeCard } from "@/shared/components";
import { IRecommendedRecipes } from "@/shared/types";
import * as motion from "framer-motion/client";
import { fadeInUp } from "@/shared/css";
import { useApi } from "@/shared/hooks";

interface IList {
  recipeType: string;
  dishType: string;
}

const _getRecipeList = async ({ recipeType, dishType }: IList) => {
  const { data, success } = await useApi({
    method: "GET",
    url: `/recipes/recipe-list?recipe=${recipeType}&dish=${dishType}`,
    cache: "default",
    isSSR: true
  });
  if (!success) return [];
  return data?.recipeList;
};

export const List = async ({ recipeType, dishType }: IList) => {
  const data = await _getRecipeList({ recipeType, dishType });
  return (
    <motion.section
      variants={fadeInUp}
      initial="hidden"
      animate="show"
      className="px-6 md:px-12 py-12 flex justify-center items-center gap-10 flex-wrap"
    >
      {data &&
        data?.map((item: IRecommendedRecipes) => {
          return (
            <RecipeCard
              _id={item._id}
              cuisineType={item.cuisineType}
              image={item.image}
              label={item.label}
              mealType={item.mealType}
              key={item._id}
            />
          );
        })}
    </motion.section>
  );
};
