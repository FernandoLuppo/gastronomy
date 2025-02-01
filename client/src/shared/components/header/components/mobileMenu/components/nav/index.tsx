"use client";

import { RECIPES_HEADER_NAV } from "@/shared/constants";
import Link from "next/link";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

export const NavMobile = () => {
  const user = false;
  const [showRecipes, setShowRecipes] = useState(false);

  const recipesArrow = showRecipes ? (
    <IoIosArrowDown size={30} />
  ) : (
    <IoIosArrowForward size={30} />
  );
  return (
    <ul className="flex flex-col gap-5">
      {user ? (
        <li className="cursor-pointer text-xl border-b-2 border-default-white pb-3 w-full">
          <Link href="/register">User menu</Link>
        </li>
      ) : (
        <>
          <li className="cursor-pointer border-b-2 text-2xl border-default-white pb-3 w-full">
            <Link href="/register">Register</Link>
          </li>
          <li className="cursor-pointer border-b-2 text-2xl border-default-white pb-3 w-full">
            <Link href="/login">Login</Link>
          </li>
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
        </>
      )}
    </ul>
  );
};
