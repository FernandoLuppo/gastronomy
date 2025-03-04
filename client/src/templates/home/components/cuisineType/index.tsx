import { Carrousel } from "@/shared/components";
import { RECIPES_HOME } from "@/shared/constants";
import { CarrouselCard } from "./components";
import { RecipeContainer } from "../components";

export const CuisineType = () => {
  return (
    <RecipeContainer
      title="Cuisine Type"
      key="cuisine-carrousel-container"
      iconAlt="Cuisine Type Icon"
      iconSrc="./icons/home/earth.svg"
    >
      <Carrousel>
        {RECIPES_HOME.cuisineType.map(item => {
          return <CarrouselCard item={item} key={item.name} />;
        })}
      </Carrousel>
    </RecipeContainer>
  );
};
