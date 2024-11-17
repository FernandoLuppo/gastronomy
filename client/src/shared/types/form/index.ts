export interface ILoginFormValues {
  email: string;
  password: string;
}

export interface IRegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IRecoverPasswordCheckEmailFormValues {
  email: string;
}

export interface IRecoverPasswordCheckSecurityCodeValues {
  securityCode: string;
}

export interface IRecoverPasswordNewPasswordValues {
  password: string;
  confirmPassword: string;
}
