import { loginSchema } from "@/shared/utils";
import { ILoginFormValues, ISubmitData } from "@/shared/types";
import { useApi, useAuthForm, useToken } from "@/shared/hooks";
import { RedirectType } from "next/navigation";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { setUser } from "@/shared/lib/features/user-slice";

interface ILoginBody extends ISubmitData {
  body: ILoginFormValues;
  redirect: (url: string, type?: RedirectType) => never;
  dispatch: Dispatch<UnknownAction>;
}

const handleForm = () => {
  const defaultValues = {
    email: "",
    password: ""
  };

  return useAuthForm({ defaultValues, authSchema: loginSchema });
};

const submitData = async ({
  reset,
  route,
  body,
  redirect,
  dispatch
}: ILoginBody) => {
  try {
    const data = await useApi({
      url: "/user/login",
      method: "POST",
      body
    });

    if (!data.success) throw new Error(data.error);
    const getToken = await useToken.get({ tokenName: "accessToken" });
    if (getToken) {
      // const user = await useToken.valid({
      //   token: { name: "accessToken", value: getToken.token as string },
      //   redirect
      // });

      // dispatch(setUser(user.token));
      return route.push("/");
    }

    return alert("Error logging in, please try again later.");
  } catch (error) {
    console.log(error);
  } finally {
    reset();
  }
};

export { handleForm, submitData };
