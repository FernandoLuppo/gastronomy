import { NextResponse } from "next/server";
import { RECIPES_HOME } from "./shared/constants";

export function middleware(request: Request) {
  const url = new URL(request.url);
  const pathSegments = url.pathname.split("/").filter(Boolean);

  if (pathSegments[0] === "recipe-list") {
    const recipeType = pathSegments[1];
    const dishType = pathSegments[2];

    switch (recipeType) {
      case "meal": {
        const validDishTypeForMeal = RECIPES_HOME.mealType.map(
          item => item.urlSeo
        );
        if (!validDishTypeForMeal.includes(dishType)) {
          return NextResponse.redirect(new URL("/404", request.url));
        }
        break;
      }

      case "cuisine": {
        const validDishTypeForCuisine = RECIPES_HOME.cuisineType.map(
          item => item.urlSeo
        );
        if (!validDishTypeForCuisine.includes(dishType)) {
          return NextResponse.redirect(new URL("/404", request.url));
        }
        break;
      }

      default:
        return NextResponse.redirect(new URL("/404", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/recipe-list/:path*"
};
