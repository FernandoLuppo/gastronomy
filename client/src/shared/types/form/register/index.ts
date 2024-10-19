import type {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister
} from "react-hook-form";

export interface IRegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IUseRegisterForm {
  register: UseFormRegister<IRegisterFormValues>;
  handleSubmit: UseFormHandleSubmit<IRegisterFormValues, undefined>;
  errors: FieldErrors<IRegisterFormValues>;
  isSubmitting: boolean;
  reset: () => void;
}
