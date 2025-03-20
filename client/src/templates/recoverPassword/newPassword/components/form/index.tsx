"use client";

import { Button, Input } from "@/shared/components";
import { RootState } from "@/shared/lib/store";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { handleForm, submitData } from "../../functions";
import { IRecoverPasswordNewPasswordValues } from "@/shared/types";
import { useEffect } from "react";
import { useToken } from "@/shared/hooks";

export const Form = () => {
  const route = useRouter();
  const { errors, handleSubmit, isSubmitting, register, reset } = handleForm();
  const handleSubmitData = async (body: IRecoverPasswordNewPasswordValues) =>
    await submitData({ reset, route, body });

  const { show } = useSelector((state: RootState) => state.passwordReducer);

  const router = useRouter();

  useEffect(() => {
    const validToken = async () => {
      const authToken = useToken.get({ tokenName: "emailToken" });

      if (!authToken.success) {
        useToken.clear({ tokenName: "emailToken" });
        return router.replace("/login");
      }

      const validToken = await useToken.valid({
        token: { name: "emailToken", value: authToken.token as string }
      });
      if (!validToken.success) {
        useToken.clear({ tokenName: "emailToken" });
        return router.replace("/login");
      }
    };
    validToken();
  }, []);

  return (
    <form onSubmit={handleSubmit(handleSubmitData)}>
      <div className="mb-10 w-full">
        <Input
          id="password"
          label="New Password"
          type={show.password ? "text" : "password"}
          register={register("password")}
          errors={errors.password}
          autoFocus
          placeholder="*****"
          passwordType="password"
        />

        <Input
          id="confirmPassword"
          label="Confirm Password"
          type={show.confirmPassword ? "text" : "password"}
          register={register("confirmPassword")}
          errors={errors.confirmPassword}
          placeholder="*****"
          passwordType="conformPassword"
        />
      </div>
      <Button text="Save" disabled={isSubmitting} />
    </form>
  );
};
