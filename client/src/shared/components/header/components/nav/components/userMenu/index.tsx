"use client";

import { linkHoverTap } from "@/shared/css";
import * as motion from "framer-motion/client";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/shared/lib/store";
import { Menu } from "./components";
import { useEffect } from "react";
import { getUser } from "@/shared/lib/features/user-slice";
import { useToken } from "@/shared/hooks";
import { authError } from "@/shared/utils";

export const UserMenu = () => {
  const { userReducer } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const validUser = async () => {
      const authToken = useToken.get({
        tokenName: "accessToken"
      });
      if (!authToken.success) {
        authError({ dispatch });
        useToken.clear({ tokenName: "accessToken" });
        useToken.clear({ tokenName: "refreshToken" });
      }

      const validToken = await useToken.valid({
        token: { name: "accessToken", value: authToken.token as string }
      });
      if (!validToken.success) {
        authError({ dispatch });
        useToken.clear({ tokenName: "accessToken" });
        useToken.clear({ tokenName: "refreshToken" });
      }

      return dispatch(getUser());
    };

    validUser();
  }, [userReducer]);
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
