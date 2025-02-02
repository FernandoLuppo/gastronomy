import { IoIosSunny, IoMdMoon } from "react-icons/io";
import * as motion from "framer-motion/client";
import { linkHoverTap } from "@/shared/css";
import { useTheme } from "next-themes";

export const DarkMode = () => {
  const { theme, setTheme } = useTheme();
  return (
    <motion.li {...linkHoverTap} className="cursor-pointer">
      {theme === "light" ? (
        <IoMdMoon size={25} onClick={() => setTheme("dark")} />
      ) : (
        <IoIosSunny size={25} onClick={() => setTheme("light")} />
      )}
    </motion.li>
  );
};
