import { loginSchema } from "@/shared/utils";
import { ILoginFormValues, ISubmitData } from "@/shared/types";
import { useApi, useAuthForm, useToken } from "@/shared/hooks";
import { RedirectType } from "next/navigation";
import toast from "react-hot-toast";
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

  const form = useAuthForm({ defaultValues, authSchema: loginSchema });
  return {
    ...form,
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting
  };
};

const submitData = async ({ reset, route, body, dispatch }: ILoginBody) => {
  try {
    const { success, error, data } = await useApi({
      url: "/user/login",
      method: "POST",
      body
    });
    if (!success) return toast.error(error as string);

    const getToken = useToken.get({ tokenName: "accessToken" });

    if (getToken && route) {
      const user = { ...data.user, logged: true };
      dispatch(setUser(user));

      return route.push("/");
    }
  } catch (error) {
    console.log(error);
  } finally {
    reset();
  }
};

export { handleForm, submitData };
