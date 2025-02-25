import { IRecommendedRecipes } from "@/shared/types";
import { IoIosArrowRoundForward } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import * as motion from "framer-motion/client";

export const RecipeCard = (item: IRecommendedRecipes) => {
  return (
    <motion.div
      key={item?._id}
      className="bg-card-light dark:bg-card-black shadow-default max-w-[250px] md:max-w-[280px] max-h-80 rounded-lg flex flex-col"
      whileHover="hover"
    >
      <Link href={`/recipe/${item._id}`}>
        <Image
          alt={item?.label}
          src={item?.image}
          width={280}
          height={171}
          style={{
            height: 171,
            objectFit: "contain",
            borderRadius: "8px 8px 0 0"
          }}
          className="bg-[#b1b1b1] dark:bg-card-black"
        />
        <div className="flex flex-col">
          <div className="p-5 flex flex-col gap-2 justify-between">
            <div className="flex-center-between">
              <p className="font-bold truncate">{item?.label}</p>
            </div>
            <div className="flex-center-between">
              <p>{item?.cuisineType[0]}</p>
              <span className="px-2 py-1 text-card-light bg-primary-light rounded-xl">
                {item?.mealType[0]}
              </span>
            </div>
          </div>
          <div className="flex-center-between bg-primary text-default-white w-full px-5 py-2 rounded-b-lg">
            <p>Read Full Recipe</p>
            <motion.div
              variants={{
                hover: { x: 10 },
                initial: { x: 0 }
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <IoIosArrowRoundForward size={32} />
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
