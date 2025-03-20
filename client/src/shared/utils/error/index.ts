import { logout } from "@/shared/lib/features/user-slice";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface IAuthError {
  dispatch: Dispatch<UnknownAction>;
  router?: AppRouterInstance;
}

const authError = ({ dispatch, router }: IAuthError) => {
  dispatch(logout());
  if (!router) return;
  if ("replace" in router && typeof router.replace === "function")
    return router.replace("/login");
};

export { authError };
