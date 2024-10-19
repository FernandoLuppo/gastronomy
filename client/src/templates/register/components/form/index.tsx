"use client";

import { IRegisterFormValues } from "@/shared/types";
import { useRouter } from "next/navigation";

import { Button, Input } from "@/shared/components";
import Link from "next/link";
import * as motion from "framer-motion/client";
import { fadeInUp } from "@/shared/css";
import { handleForm, submitData } from "../../functions";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/lib/store";

export const Form = () => {
  const route = useRouter();
  const { errors, handleSubmit, isSubmitting, register, reset } = handleForm();
  const handleSubmitData = async (body: IRegisterFormValues) => {
    console.log(1);
    await submitData({ reset, route, body });
  };
  const { show } = useSelector((state: RootState) => state.passwordReducer);

  return (
    <div className="lg:w-1/2 flex-col flex-center w-full">
      <motion.div
        className="w-full md:w-[330px] max-w-none md:max-w-[330px]"
        variants={fadeInUp}
        initial="hidden"
        animate="show"
      >
        <h1 className="text-6xl text-center mb-16">Sign up</h1>

        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit(handleSubmitData)}
        >
          <Input
            autoFocus
            id="name"
            label="Name"
            type="name"
            placeholder="Your Name"
            register={{ ...register("name") }}
            errors={errors.name}
          />
          <Input
            id="email"
            label="Email"
            type="email"
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
          <Input
            id="confirmPassword"
            label="ConfirmPassword"
            type={show.confirmPassword ? "text" : "password"}
            passwordType="conformPassword"
            placeholder="Confirm Your Password"
            register={{ ...register("confirmPassword") }}
            errors={errors.confirmPassword}
          />

          <div className="mt-5">
            <Button type="submit" text="Sign up" disabled={isSubmitting} />
          </div>
          <p>
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-semibold">
              Sign in
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};
