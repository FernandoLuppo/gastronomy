import { loginSchema } from "@/shared/utils";
import { ILoginFormValues, ISubmitData } from "@/shared/types";
import { useApi, useAuthForm } from "@/shared/hooks";

interface ILoginBody extends ISubmitData {
  body: ILoginFormValues;
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
    const data = await useApi({
      url: "/user/login",
      method: "POST",
      body
    });

    if (!data.success) throw new Error(data.error);

    route.push("/");
  } catch (error) {
    console.log(error);
  } finally {
    reset();
  }
};

export { handleForm, submitData };
