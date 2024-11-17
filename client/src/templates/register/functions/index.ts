import { registerSchema } from "@/shared/utils";
import { IRegisterFormValues, ISubmitData } from "@/shared/types";
import { useApi, useAuthForm } from "@/shared/hooks";

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
    const data = await useApi({
      url: "/user/register",
      method: "POST",
      body
    });
    if (!data.success) throw new Error(data.error);

    route.push("/login");
  } catch (error) {
    console.log(error);
  } finally {
    reset();
  }
};

export { handleForm, submitData };
