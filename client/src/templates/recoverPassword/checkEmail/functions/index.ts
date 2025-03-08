import { useApi, useAuthForm } from "@/shared/hooks";
import {
  IRecoverPasswordCheckEmailFormValues,
  ISubmitData
} from "@/shared/types";
import { checkEmailSchema } from "@/shared/utils";
import toast from "react-hot-toast";

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
    const { success, error } = await useApi({
      url: "/recover-password/check-email",
      method: "POST",
      body
    });

    if (!success) return toast.error(error as string);

    route.push("/recover-password/security-code");
  } catch (error) {
    console.log(error);
  } finally {
    reset();
  }
};

export { handleForm, submitData };
