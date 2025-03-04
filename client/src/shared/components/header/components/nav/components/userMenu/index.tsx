import { linkHoverTap } from "@/shared/css";
import * as motion from "framer-motion/client";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/lib/store";
import { Menu } from "./components";

export const UserMenu = () => {
  const { userReducer } = useSelector((state: RootState) => state);

  return (
    <>
      {userReducer?.logged ? (
        <Menu />
      ) : (
        <>
          <motion.li {...linkHoverTap} className="cursor-pointer">
            <Link href="/register">Register</Link>
          </motion.li>
          <motion.li {...linkHoverTap} className="cursor-pointer">
            <Link href="/login">Login</Link>
          </motion.li>
        </>
      )}
    </>
  );
};
