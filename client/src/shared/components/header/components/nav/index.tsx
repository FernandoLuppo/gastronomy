import { fadeIn } from "@/shared/css";
import * as motion from "framer-motion/client";
import { DarkMode, RecipeList, SearchBar, UserMenu } from "./components";

export const Nav = () => {
  return (
    <motion.nav
      variants={fadeIn}
      initial="hidden"
      animate="show"
      className="lg:block hidden"
    >
      <ul className="flex items-center gap-6 text-default-white">
        <RecipeList />
        <SearchBar />
        <DarkMode />
        <UserMenu />
      </ul>
    </motion.nav>
  );
};
