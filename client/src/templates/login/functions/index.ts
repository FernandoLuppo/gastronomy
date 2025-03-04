import { loginSchema } from "@/shared/utils";
import { ILoginFormValues, ISubmitData } from "@/shared/types";
import { useApi, useAuthForm, useToken } from "@/shared/hooks";
import { RedirectType } from "next/navigation";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

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

const submitData = async ({ reset, route, body }: ILoginBody) => {
  try {
    const { success, error } = await useApi({
      url: "/user/login",
      method: "POST",
      body
    });
    if (!success) return toast.error(error as string);

    const getToken = await useToken.get({ tokenName: "accessToken" });
    if (getToken) {
      return route.push("/");
    }
  } catch (error) {
    console.log(error);
  } finally {
    reset();
  }
};

export { handleForm, submitData };
