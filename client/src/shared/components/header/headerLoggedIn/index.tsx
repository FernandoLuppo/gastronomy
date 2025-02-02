"use client";

import { Logo, MobileMenu, Nav } from "../components";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useMemo, useEffect } from "react";
import clsx from "clsx";
import { IoMdMenu } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/shared/lib/store";
import { setMobileMenu } from "@/shared/lib/features/mobile-slice";

export const HeaderLoggedIn = () => {
  const { scrollY } = useScroll();
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const { mobileMenu } = useSelector(
    (state: RootState) => state.mobileReducer.show
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const updateScreenSize = () => {
      setIsLargeScreen(window.innerWidth > 1024);
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);

    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["transparent", "#7b1d20"]
  );

  const headerStyles = useMemo(() => {
    if (!isLargeScreen) return { backgroundColor: "#7b1d20" };
    return { backgroundColor: backgroundColor };
  }, [isLargeScreen, backgroundColor]);

  return (
    <motion.header
      className={clsx(
        "w-full flex justify-between items-center p-6 md:p-12 fixed top-0 z-10",
        {
          "bg-primary": !isLargeScreen || mobileMenu,
          "bg-none": isLargeScreen && !mobileMenu
        }
      )}
      style={headerStyles}
      transition={{
        ease: "easeIn",
        duration: 0.3
      }}
    >
      <Logo />

      <Nav />
      <IoMdMenu
        size={30}
        className="block lg:hidden cursor-pointer text-default-white"
        onClick={() => dispatch(setMobileMenu(true))}
      />

      {mobileMenu && <MobileMenu />}
    </motion.header>
  );
};
