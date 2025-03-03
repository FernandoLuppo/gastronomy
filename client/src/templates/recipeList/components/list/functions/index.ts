import { useApi } from "@/shared/hooks";

const getRecipeList = async ({
  recipeType,
  dishType
}: {
  recipeType: string;
  dishType: string;
}) => {
  const { data } = await useApi({
    method: "GET",
    url: `/recipes/recipe-list?recipe=${recipeType}&dish=${dishType}`
  });

  return data.recipeList;
};

export { getRecipeList };
