"use client";

import { RECIPES_HEADER_NAV } from "@/shared/constants";
import { RootState } from "@/shared/lib/store";
import Link from "next/link";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../nav/components/userMenu/components/menu/functions";
import { useRouter } from "next/navigation";

export const NavMobile = () => {
  const [showRecipes, setShowRecipes] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const { userReducer } = useSelector((state: RootState) => state);

  const recipesArrow = showRecipes ? (
    <IoIosArrowDown size={30} />
  ) : (
    <IoIosArrowForward size={30} />
  );
  return (
    <ul className="flex flex-col gap-5">
      {userReducer.logged ? (
        <li
          className="cursor-pointer flex flex-col  justify-between border-b-2 text-2xl border-default-white pb-3 w-full"
          onClick={() => setShowUserMenu(prev => !prev)}
        >
          <div className="w-full flex justify-between items-center">
            User menu
            {recipesArrow}
          </div>

          {showUserMenu && (
            <ul className="p-5 flex flex-col gap-5">
              <li>
                <Link href="/profile">Profile</Link>
              </li>
              <li>
                <button
                  className=""
                  onClick={async () => await logoutUser(dispatch, router)}
                >
                  Log Out
                </button>
              </li>
            </ul>
          )}
        </li>
      ) : (
        <>
          <li className="cursor-pointer border-b-2 text-2xl border-default-white pb-3 w-full">
            <Link href="/register">Register</Link>
          </li>
          <li className="cursor-pointer border-b-2 text-2xl border-default-white pb-3 w-full">
            <Link href="/login">Login</Link>
          </li>
        </>
      )}
      <li
        className="cursor-pointer flex flex-col  justify-between border-b-2 text-2xl border-default-white pb-3 w-full"
        onClick={() => setShowRecipes(prev => !prev)}
      >
        <div className="w-full flex justify-between items-center">
          Recipes
          {recipesArrow}
        </div>

        {showRecipes && (
          <ul className="p-5 flex flex-col gap-5">
            {RECIPES_HEADER_NAV.map(item => {
              return (
                <li>
                  <Link href={item.url}>{item.label}</Link>
                </li>
              );
            })}
          </ul>
        )}
      </li>
    </ul>
  );
};
