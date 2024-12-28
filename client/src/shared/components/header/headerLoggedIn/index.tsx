"use client";

import { Nav } from "../components";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeIn } from "@/shared/css";
import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from "react";
import clsx from "clsx";

export const HeaderLoggedIn = () => {
  const user = false;

  const { scrollY } = useScroll();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["transparent", "#7b1d20"]
  );
  const headerStyles = useMemo(() => {
    return {
      backgroundColor: showMobileMenu ? "#7b1d20" : backgroundColor
    };
  }, [showMobileMenu, backgroundColor]);

  return (
    <motion.header
      className={clsx(
        "w-full flex justify-center lg:justify-between items-center p-12 lg:bg-none lg:fixed lg:top-0 lg:z-10 bg-primary",
        {
          "bg-none": !showMobileMenu,
          lute: showMobileMenu
        }
      )}
      style={headerStyles}
      transition={{
        ease: "easeIn",
        duration: 0.3
      }}
    >
      <motion.div variants={fadeIn} initial="hidden" animate="show">
        <Link href="/" className="flex gap-2 items-end">
          <Image alt="" src="/icons/logo.svg" width={50} height={50} />
          <h1 className="text-default-white font-la-belle-aurore text-4xl">
            LuppoTW
          </h1>
        </Link>
      </motion.div>

      <Nav />
    </motion.header>
  );
};
