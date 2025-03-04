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

  return useAuthForm({ defaultValues, authSchema: newPasswordSchema });
};

const submitData = async ({
  body,
  reset,
  route
}: IRecoverPasswordNewPasswordBody) => {
  try {
    const newPasswordToken = await useToken.get({ tokenName: "emailToken" });
    if (!newPasswordToken.success) throw new Error(newPasswordToken.error);

    const { success, error } = await useApi({
      url: "/recover-password/new-password",
      method: "PATCH",
      body,
      token: newPasswordToken.token
    });
    if (!success) return toast.error(error as string);

    useToken.clear({ tokenName: "emailToken" });
    return route.push("/login");
  } catch (error) {
    console.log(error);
  } finally {
    reset();
  }
};

export { handleForm, submitData };
