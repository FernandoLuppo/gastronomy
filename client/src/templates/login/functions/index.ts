import { yupResolver } from "@hookform/resolvers/yup";
import { handleError, loginSchema } from "@/shared/utils";

import { useForm } from "react-hook-form";
import { ILoginFormValues, ISubmitData } from "@/shared/types";
import { useApi } from "@/shared/hooks";

interface ILoginBody extends ISubmitData {
  body: ILoginFormValues;
}

export const handleForm = () => {
  const { register, handleSubmit, formState, reset } = useForm({
    mode: "all",
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const { errors, isSubmitting } = formState;

  return { register, handleSubmit, errors, isSubmitting, reset };
};

export const submitData = async ({ reset, route, body }: ILoginBody) => {
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
