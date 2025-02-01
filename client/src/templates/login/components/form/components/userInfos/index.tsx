"use client";

import { ILoginFormValues } from "@/shared/types";
import { useRouter } from "next/navigation";
import { handleForm, submitData } from "../../../../functions";
import { Button, Input } from "@/shared/components";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/shared/lib/store";
import { linkHoverTapLight } from "@/shared/css";
import * as motion from "framer-motion/client";
import { redirect } from "next/navigation";

export const UserInfos = () => {
  const route = useRouter();
  const dispatch = useDispatch();
  const { errors, handleSubmit, isSubmitting, register, reset } = handleForm();
  const handleSubmitData = async (body: ILoginFormValues) =>
    await submitData({ reset, route, body, redirect, dispatch });
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
      <motion.div className="mb-5" {...linkHoverTapLight}>
        <Link href="/recover-password/check-email" className="underline">
          Forgot Password?
        </Link>
      </motion.div>

      <Button text="Sign in" disabled={isSubmitting} />
      <p className="flex gap-1">
        Don't have an account?{" "}
        <motion.div {...linkHoverTapLight}>
          <Link
            href="/register"
            className="text-primary dark:text-primary-light font-semibold underline"
          >
            Sign up
          </Link>
        </motion.div>
      </p>
    </form>
  );
};
