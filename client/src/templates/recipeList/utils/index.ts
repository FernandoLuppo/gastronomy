import { RECIPES_HOME } from "@/shared/constants";
import { upperCaseFistLetter } from "@/shared/utils";

const pageContent = ({
  params
}: {
  params: { recipeType: string; dishType: string };
}) => {
  let content = {
    urlImg: "",
    dropdown: [{ label: "", urlSeo: "" }],
    recipeType: params.recipeType,
    dishType: params.dishType
  };

  switch (params.recipeType) {
    case "meal":
      content.urlImg = "/images/recipeList/cuisine-type-banner.png";
      content.dropdown = RECIPES_HOME.mealType.map(item => ({
        label: item.name,
        urlSeo: item.urlSeo
      }));
      break;
    case "cuisine":
      content.urlImg = "/images/recipeList/cuisine-type-banner.png";
      content.dropdown = RECIPES_HOME.cuisineType.map(item => ({
        label: item.name,
        urlSeo: item.urlSeo
      }));
      break;
    default:
      content.urlImg = "";
      content.dropdown = [{ label: "", urlSeo: "" }];
      break;
  }

  return content;
};

const recipeListDataFormatter = ({
  content
}: {
  content: {
    urlImg: string;
    dropdown: { label: string; urlSeo: string }[];
    recipeType: string;
    dishType: string;
  };
}) => {
  const recipeTypePath = upperCaseFistLetter(content.recipeType);
  const dishTypePath = upperCaseFistLetter(content.dishType);
  const path = `${recipeTypePath} / ${dishTypePath}`;
  const upperCasePath = `${recipeTypePath.toLocaleUpperCase()} / ${dishTypePath.toLocaleUpperCase()}`;
  const options = content.dropdown.filter(item => item.label !== dishTypePath);

  return { path, upperCasePath, options, dishTypePath };
};

export { recipeListDataFormatter, pageContent };
