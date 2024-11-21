import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

interface IUseAuthForm {
  authSchema: any;
  defaultValues: any;
}

const useAuthForm = ({ authSchema, defaultValues }: IUseAuthForm) => {
  const { register, handleSubmit, formState, reset } = useForm({
    mode: "all",
    resolver: yupResolver(authSchema),
    defaultValues
  });

  const { errors, isSubmitting } = formState;

  return { register, handleSubmit, errors, isSubmitting, reset };
};

export { useAuthForm };
