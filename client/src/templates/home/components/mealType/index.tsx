import { RECIPES_HOME } from "@/shared/constants";
import { Carrousel } from "@/shared/components";
import { CarrouselCard } from "./components";
import { RecipeContainer } from "../components";

export const MealType = () => {
  return (
    <RecipeContainer
      bgColor
      title="Meal Type"
      key="meal-carrousel-container"
      iconAlt="Meal Type Icon"
      iconSrc="./icons/home/food-tray.svg"
    >
      <Carrousel>
        {RECIPES_HOME.mealType.map(item => (
          <CarrouselCard item={item} key={item.name} />
        ))}
      </Carrousel>
    </RecipeContainer>
  );
};
