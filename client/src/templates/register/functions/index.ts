import { registerSchema } from "@/shared/utils";
import { IRegisterFormValues, ISubmitData } from "@/shared/types";
import { useApi, useAuthForm } from "@/shared/hooks";
import toast from "react-hot-toast";

interface IRegisterBody extends ISubmitData {
  body: IRegisterFormValues;
}

const handleForm = () => {
  const defaultValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  return useAuthForm({ defaultValues, authSchema: registerSchema });
};

const submitData = async ({ reset, route, body }: IRegisterBody) => {
  try {
    const { success, error } = await useApi({
      url: "/user/register",
      method: "POST",
      body
    });
    if (!success) return toast.error(error as string);

    route.push("/login");
  } catch (error) {
    console.log(error);
  } finally {
    reset();
  }
};

export { handleForm, submitData };
