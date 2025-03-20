import { useApi, useAuthForm, useToken } from "@/shared/hooks";
import { IRecoverPasswordNewPasswordValues, ISubmitData } from "@/shared/types";
import { newPasswordSchema } from "@/shared/utils";
import toast from "react-hot-toast";

interface IRecoverPasswordNewPasswordBody extends ISubmitData {
  body: IRecoverPasswordNewPasswordValues;
}

const handleForm = () => {
  const defaultValues = {
    password: "",
    confirmPassword: ""
  };

  const form = useAuthForm({
    defaultValues,
    authSchema: newPasswordSchema
  });
  return {
    ...form,
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting
  };
};

const submitData = async ({
  body,
  reset,
  route
}: IRecoverPasswordNewPasswordBody) => {
  try {
    const newPasswordToken = useToken.get({ tokenName: "emailToken" });
    if (!newPasswordToken.success) throw new Error(newPasswordToken.error);
    const { success, error } = await useApi({
      url: "/recover-password/new-password",
      method: "PATCH",
      body,
      token: newPasswordToken.token
    });
    if (!success) return toast.error(error as string);

    useToken.clear({ tokenName: "emailToken" });
    if (route) return route.push("/login");
  } catch (error) {
    console.log(error);
  } finally {
    reset();
  }
};

export { handleForm, submitData };
