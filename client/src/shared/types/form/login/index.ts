import type {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister
} from "react-hook-form";

export interface ILoginFormValues {
  email: string;
  password: string;
}

export interface IUseLoginForm {
  register: UseFormRegister<ILoginFormValues>;
  handleSubmit: UseFormHandleSubmit<ILoginFormValues, undefined>;
  errors: FieldErrors<ILoginFormValues>;
  isSubmitting: boolean;
  reset: () => void;
}
