"use client";

import { ILoginFormValues } from "@/shared/types";
import { useRouter } from "next/navigation";
import { handleForm, submitData } from "../../../../functions";
import { Button, Input } from "@/shared/components";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/lib/store";

export const UserInfos = () => {
  const route = useRouter();
  const { errors, handleSubmit, isSubmitting, register, reset } = handleForm();
  const handleSubmitData = async (body: ILoginFormValues) =>
    await submitData({ reset, route, body });
  const { show } = useSelector((state: RootState) => state.passwordReducer);

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={handleSubmit(handleSubmitData)}
    >
      <Input
        id="email"
        label="Email"
        type="email"
        autoFocus
        placeholder="your-email@gmail.com"
        register={{ ...register("email") }}
        errors={errors.email}
      />
      <Input
        id="password"
        label="Password"
        type={show.password ? "text" : "password"}
        passwordType="password"
        placeholder="Your Password"
        register={{ ...register("password") }}
        errors={errors.password}
      />
      <div className="flex-center-between mb-5">
        <Link href="/recover-password/check-email" className="underline ">
          Forgot Password?
        </Link>
      </div>

      <Button text="Sign in" disabled={isSubmitting} />
      <p>
        Don't have an account?{" "}
        <Link href="/register" className="text-primary font-semibold">
          Sign up
        </Link>
      </p>
    </form>
  );
};
