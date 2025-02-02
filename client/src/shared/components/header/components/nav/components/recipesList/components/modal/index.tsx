import { linkHoverTap } from "@/shared/css";
import * as motion from "framer-motion/client";
import Link from "next/link";
import { RECIPES_HEADER_NAV } from "@/shared/constants";

export const RecipesModal = () => {
  return (
    <ul className="flex flex-col gap-3 w-max absolute top-6 right-0 p-4 rounded-lg shadow-default border-2 border-gray-300 bg-default-white text-default-black">
      {RECIPES_HEADER_NAV.map(item => {
        return (
          <motion.li {...linkHoverTap}>
            <Link href={item.url}>{item.label}</Link>
          </motion.li>
        );
      })}
    </ul>
  );
};
