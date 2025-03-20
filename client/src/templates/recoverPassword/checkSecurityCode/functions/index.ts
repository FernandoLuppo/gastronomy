import { useApi, useAuthForm, useToken } from "@/shared/hooks";
import { checkSecurityCodeSchema } from "@/shared/utils";
import {
  IRecoverPasswordCheckSecurityCodeValues,
  ISubmitData
} from "@/shared/types";
import toast from "react-hot-toast";

interface IRecoverPasswordCheckSecurityCodeBody extends ISubmitData {
  body: IRecoverPasswordCheckSecurityCodeValues;
}

const handleForm = () => {
  const defaultValues = {
    securityCode: ""
  };

  const form = useAuthForm({
    defaultValues,
    authSchema: checkSecurityCodeSchema
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
}: IRecoverPasswordCheckSecurityCodeBody) => {
  try {
    const securityCodeToken = useToken.get({ tokenName: "emailToken" });

    if (!securityCodeToken.success) throw new Error(securityCodeToken.error);

    const { success, error } = await useApi({
      url: "/recover-password/check-security-code",
      method: "POST",
      body,
      token: securityCodeToken.token
    });
    if (!success) return toast.error(error as string);

    if (route) return route.push("/recover-password/new-password");
  } catch (error) {
    console.log(error);
  } finally {
    reset();
  }
};

export { handleForm, submitData };
