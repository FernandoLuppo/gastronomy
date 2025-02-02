"use client";

import { linkHoverTap } from "@/shared/css";
import { FaUserCircle } from "react-icons/fa";
import * as motion from "framer-motion/client";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/lib/store";

export const UserMenu = () => {
  const { userReducer } = useSelector((state: RootState) => state);

  return (
    <>
      {userReducer?.logged ? (
        <motion.li {...linkHoverTap}>
          <Link href="">
            <FaUserCircle size={30} color="#F2F2F2" />
          </Link>
        </motion.li>
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
