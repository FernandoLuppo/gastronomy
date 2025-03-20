"use client";

import { Button, Input } from "@/shared/components";
import { RootState } from "@/shared/lib/store";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { useSelector } from "react-redux";
import { IUpdateUserInfosValues } from "@/shared/types";
import { useState } from "react";

interface IForm {
  errors: FieldErrors<IUpdateUserInfosValues>;
  isSubmitting: boolean;
  register: UseFormRegister<IUpdateUserInfosValues>;
}

export const Form = ({ errors, isSubmitting, register }: IForm) => {
  const [disabled, setDisabled] = useState(true);

  const { show, user } = useSelector((state: RootState) => ({
    show: state.passwordReducer.show,
    user: state.userReducer
  }));
  return (
    <div className="flex flex-col gap-5">
      <Button
        text="Edit"
        bgColor={"#475993"}
        onClick={() => setDisabled(prev => !prev)}
      />

      <Input
        id="name"
        label="Name"
        placeholder={user.name}
        register={{ ...register("name") }}
        errors={errors.name}
        disabled={disabled}
      />

      <Input
        id="email"
        label="Email"
        placeholder={user.email}
        register={{ ...register("email") }}
        errors={errors.email}
        disabled={disabled}
        type="email"
      />

      <Input
        id="password"
        label="Password"
        register={{ ...register("password") }}
        errors={errors.password}
        type={show.password ? "text" : "password"}
        passwordType="password"
        disabled={disabled}
      />

      <Button text="Save" disabled={isSubmitting} />
    </div>
  );
};
