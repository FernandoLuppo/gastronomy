"use client";

import { DarkMode } from "../nav/components";
import { IoMdClose } from "react-icons/io";
import { Logo } from "../logo";
import { useDispatch } from "react-redux";
import { setMobileMenu } from "@/shared/lib/features/mobile-slice";
import { NavMobile } from "./components";

export const MobileMenu = () => {
  const dispatch = useDispatch();

  return (
    <div className="absolute top-0 left-0 w-full min-h-screen bg-primary text-default-white">
      <div className="w-full flex flex-col justify-center list-none p-6">
        <div className="flex justify-between items-center">
          <Logo />

          <div
            className="cursor-pointer"
            onClick={() => dispatch(setMobileMenu(false))}
          >
            <IoMdClose size={25} />
          </div>
        </div>

        <div className="w-full flex justify-end items-end">
          <DarkMode />
        </div>

        <div className="mt-20">
          <NavMobile />
        </div>
      </div>
    </div>
  );
};
