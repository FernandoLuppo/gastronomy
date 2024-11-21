import { useApi, useAuthForm, useToken } from "@/shared/hooks";
import {
  IRecoverPasswordCheckEmailFormValues,
  ISubmitData
} from "@/shared/types";
import { checkEmailSchema } from "@/shared/utils";

interface IRecoverPasswordCheckEmailBody extends ISubmitData {
  body: IRecoverPasswordCheckEmailFormValues;
}

const handleForm = () => {
  const defaultValues = {
    email: ""
  };

  return useAuthForm({ defaultValues, authSchema: checkEmailSchema });
};

const submitData = async ({
  body,
  reset,
  route
}: IRecoverPasswordCheckEmailBody) => {
  try {
    const data = await useApi({
      url: "/recover-password/check-email",
      method: "POST",
      body
    });

    if (!data.success) throw new Error(data.error);

    route.push("/recover-password/security-code");
  } catch (error) {
    console.log(error);
  } finally {
    reset();
  }
};

export { handleForm, submitData };
