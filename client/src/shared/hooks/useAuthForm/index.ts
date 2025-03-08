import { useForm, UseFormReturn, DefaultValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AnyObjectSchema, InferType } from "yup";

interface IUseAuthForm<T extends AnyObjectSchema> {
  authSchema: T;
  defaultValues: InferType<T>;
}

const useAuthForm = <T extends AnyObjectSchema>({
  authSchema,
  defaultValues
}: IUseAuthForm<T>): UseFormReturn<InferType<T>> => {
  const formMethods = useForm<InferType<T>>({
    mode: "all",
    resolver: yupResolver(authSchema),
    defaultValues: defaultValues as DefaultValues<InferType<T>>
  });

  return formMethods;
};

export { useAuthForm };
