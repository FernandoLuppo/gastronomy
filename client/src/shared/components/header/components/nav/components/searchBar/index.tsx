"use client";

import { useApi } from "@/shared/hooks";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosSearch } from "react-icons/io";
import { RecipeList } from "./components";
import { IRecipe } from "./types";
import Link from "next/link";

export const SearchBar = () => {
  const [searchIngredient, setSearchIngredient] = useState("");
  const [recipes, setRecipes] = useState<IRecipe[] | null>(null);
  const { register, watch } = useForm();
  const inputValue = watch("search");

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchIngredient(inputValue || "");
    }, 500);

    return () => clearTimeout(handler);
  }, [inputValue]);

  useEffect(() => {
    const getSearchData = async () => {
      const data = await useApi({
        method: "POST",
        url: "/recipes/search",
        body: { ingredient: searchIngredient }
      });

      const hits = data.recipes?.hits ?? [];
      setRecipes(hits.slice(0, 3));
    };

    if (searchIngredient) getSearchData();
  }, [searchIngredient]);

  return (
    <>
      <li className="relative">
        <Link href={""}>
          <input
            type="text"
            placeholder="Search by Ingredient..."
            className="max-w-56 rounded-md p-2 pr-11 text-default-black bg-default-white"
            {...register("search")}
            onBlur={() => setRecipes(null)}
          />
          <IoIosSearch
            color="#252525"
            size={29}
            className="absolute right-2 top-1 cursor-pointer"
          />
          {recipes && recipes?.length > 0 && (
            <RecipeList recipes={recipes} searchIngredient={searchIngredient} />
          )}
        </Link>
      </li>
    </>
  );
};
