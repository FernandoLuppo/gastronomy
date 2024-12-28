import { fadeIn } from "@/shared/css";
import {
  IoIosArrowDown,
  IoIosSearch,
  IoMdMoon,
  IoIosSunny
} from "react-icons/io";
import * as motion from "framer-motion/client";

export const Nav = () => {
  const theme = "light";
  const user = false;

  return (
    <motion.nav variants={fadeIn} initial="hidden" animate="show">
      <ul className="flex items-center gap-6 text-default-white">
        <li className="flex items-center gap-1 cursor-pointer">
          Recipies <IoIosArrowDown size={20} />
        </li>
        <li className="relative">
          <input
            type="text"
            name=""
            id=""
            className="max-w-52 rounded-md p-2 pr-11 text-default-black"
          />
          <IoIosSearch
            color="#252525"
            size={29}
            className="absolute right-2 top-1 cursor-pointer"
          />
        </li>
        <li className="cursor-pointer">
          {theme === "light" ? (
            <IoMdMoon size={25} />
          ) : (
            <IoIosSunny size={25} />
          )}
        </li>

        {user ? null : (
          <>
            <li className="cursor-pointer">Register</li>
            <li className="cursor-pointer">Login</li>
          </>
        )}
      </ul>
    </motion.nav>
  );
};
