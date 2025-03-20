import { updateUserInfosSchema } from "@/shared/utils";
import { IUpdateUserInfosValues, ISubmitData } from "@/shared/types";
import { useApi, useAuthForm, useToken } from "@/shared/hooks";
import toast from "react-hot-toast";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { setUser } from "@/shared/lib/features/user-slice";

interface IUpdateUserInfosBody extends ISubmitData {
  body: IUpdateUserInfosValues;
  dispatch: Dispatch<UnknownAction>;
}

const handleForm = () => {
  const defaultValues = {
    name: "",
    email: "",
    password: ""
  };

  const form = useAuthForm({
    defaultValues,
    authSchema: updateUserInfosSchema
  });
  return {
    ...form,
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting
  };
};

const submitData = async ({ reset, body, dispatch }: IUpdateUserInfosBody) => {
  try {
    const accessToken = useToken.get({ tokenName: "accessToken" });
    const refreshToken = useToken.get({ tokenName: "refreshToken" });

    if (!accessToken.success) throw new Error(accessToken.error);
    if (!refreshToken.success) throw new Error(refreshToken.error);

    const tokens = {
      accessToken: accessToken.token,
      refreshToken: refreshToken.token
    };

    const { success, error, data } = await useApi({
      url: "/user/update-infos",
      method: "PATCH",
      body,
      token: JSON.stringify(tokens)
    });
    if (!success) return toast.error(error as string);

    const user = { ...data.user, logged: true };

    dispatch(setUser(user));
  } catch (error) {
    console.log(error);
  } finally {
    reset();
  }
};

export { handleForm, submitData };
