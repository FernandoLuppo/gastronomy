import { Carrousel, RecipeCard } from "@/shared/components";
import { useApi } from "@/shared/hooks";
import Image from "next/image";
import * as motion from "framer-motion/client";
import { fadeInUp } from "@/shared/css";
import { IRecipeCard } from "./types";

const getRecommendedRecipes = async () => {
  const { data } = await useApi({
    method: "GET",
    url: "/recipes/home-content/recommended",
    cache: "force-cache",
    isSSR: true
  });

  return data?.list;
};

export const Recommended = async () => {
  const data = await getRecommendedRecipes();

  return (
    <motion.section
      className="p-6 md:p-12"
      variants={fadeInUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <div className="flex gap-2 items-center justify-center md:justify-start">
        <h2 className="font-libre-baskerville text-2xl  md:text-4xl uppercase">
          Recommended
        </h2>
        <Image
          alt="Recommended Icon"
          src={"./icons/home/medal.svg"}
          width={40}
          height={40}
        />
      </div>
      <div>
        {data?.length > 1 && (
          <Carrousel>
            {data
              ?.filter((item: unknown) => item != null)
              .map(
                ({ _id, cuisineType, image, label, mealType }: IRecipeCard) => {
                  return (
                    <RecipeCard
                      key={_id}
                      _id={_id || ""}
                      cuisineType={cuisineType || ""}
                      image={image || ""}
                      label={label || ""}
                      mealType={mealType || ""}
                    />
                  );
                }
              )}
          </Carrousel>
        )}
      </div>
    </motion.section>
  );
};
