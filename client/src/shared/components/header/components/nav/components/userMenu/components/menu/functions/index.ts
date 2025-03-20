import { useApi } from "@/shared/hooks";
import toast from "react-hot-toast";
import { logout } from "@/shared/lib/features/user-slice";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const logoutUser = async (
  dispatch: Dispatch<UnknownAction>,
  router: AppRouterInstance
) => {
  try {
    const { success, error } = await useApi({
      method: "GET",
      url: "/user/logout"
    });
    if (!success) return toast.error(error as string);

    dispatch(logout());
    router.replace("/login");
  } catch (error) {
    console.log(error);
    return toast.error("There was an unknown error, please try again later.");
  }
};

export { logoutUser };
