import RecipeListTemplate from "@/templates/recipeList";

const RecipeList = ({
  params
}: {
  params: { recipeType: string; dishType: string };
}) => {
  return <RecipeListTemplate params={params} />;
};

export default RecipeList;
