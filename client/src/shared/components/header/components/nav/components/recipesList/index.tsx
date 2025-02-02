"use client";

import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { motion } from "framer-motion";
import { linkHoverTap } from "@/shared/css";
import { useState } from "react";
import { RecipesModal } from "./components";

export const RecipeList = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <motion.li
        {...linkHoverTap}
        className="flex items-center gap-1 cursor-pointer relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Recipes
        {isHovered ? (
          <>
            <IoIosArrowDown size={20} />
            <RecipesModal />
          </>
        ) : (
          <IoIosArrowForward size={20} />
        )}
      </motion.li>
    </>
  );
};
