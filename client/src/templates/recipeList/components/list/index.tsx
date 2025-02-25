"use client";

import { useApi } from "@/shared/hooks";
import { getRecipeList } from "./functions";
import { useEffect, useState } from "react";
import { RecipeCard } from "@/shared/components";
import { IRecommendedRecipes } from "@/shared/types";

export const List = ({
  recipeType,
  dishType
}: {
  recipeType: string;
  dishType: string;
}) => {
  const [recipeList, setRecipeList] = useState<null | []>(null);

  useEffect(() => {
    const getList = async () => {
      const data = await getRecipeList({ recipeType, dishType });
      setRecipeList(data);
    };

    getList();
  }, []);

  return (
    <section className="px-6 md:px-12 py-12 flex justify-center items-center gap-10 flex-wrap">
      {recipeList &&
        recipeList.map((item: IRecommendedRecipes) => {
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
    </section>
  );
};
