import Image from "next/image";
import { IRecipe } from "../../types";
import { linkHoverTap, linkHoverTapLight } from "@/shared/css";
import * as motion from "framer-motion/client";
import Link from "next/link";

interface IRecipeList {
  recipes: IRecipe[];
  searchIngredient: string;
}

export const RecipeList = ({ recipes, searchIngredient }: IRecipeList) => {
  return (
    <div className="absolute top-11 p-3 rounded-lg border-2 border-gray-300 bg-card-light shadow-default">
      <div>
        {recipes.map(item => (
          <div
            key={item.recipe.label}
            className=" py-3 border-b-2 border-gray-300"
          >
            <motion.div
              className="flex items-center gap-3"
              {...linkHoverTapLight}
            >
              <Image
                alt={item.recipe.label}
                src={item.recipe.image}
                width={40}
                height={40}
              />
              <span className="text-sm text-default-black">
                {item.recipe.label}
              </span>
            </motion.div>
          </div>
        ))}
        <motion.div {...linkHoverTap} className="text-center pt-3 ">
          <Link href={`/ingredients/${searchIngredient}`} className="w-fit">
            <span className="text-primary text-sm font-medium">Others...</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};
