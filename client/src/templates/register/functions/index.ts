import { yupResolver } from "@hookform/resolvers/yup";
import { handleError, registerSchema } from "@/shared/utils";
import { useForm } from "react-hook-form";
import { IRegisterFormValues, ISubmitData } from "@/shared/types";
import { useApi } from "@/shared/hooks";

interface IRegisterBody extends ISubmitData {
  body: IRegisterFormValues;
}

export const handleForm = () => {
  const { register, handleSubmit, formState, reset } = useForm({
    mode: "all",
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  const { errors, isSubmitting } = formState;

  return { register, handleSubmit, errors, isSubmitting, reset };
};

export const submitData = async ({ reset, route, body }: IRegisterBody) => {
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
