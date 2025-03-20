"use client";

import { Button, Input } from "@/shared/components";
import { useRouter } from "next/navigation";
import { handleForm, submitData } from "../../functions";
import { IRecoverPasswordCheckSecurityCodeValues } from "@/shared/types";
// import { useEffect } from "react";
// import { useToken } from "@/shared/hooks";

export const Form = () => {
  const route = useRouter();
  const { errors, handleSubmit, isSubmitting, register, reset } = handleForm();
  const handleSubmitData = async (
    body: IRecoverPasswordCheckSecurityCodeValues
  ) => await submitData({ reset, route, body });

  // const router = useRouter();

  // useEffect(() => {
  //   const validToken = async () => {
  //     const authToken = useToken.get({ tokenName: "emailToken" });

  //     if (!authToken.success) {
  //       useToken.clear({ tokenName: "emailToken" });
  //       return router.replace("/login");
  //     }

  //     const validToken = await useToken.valid({
  //       token: { name: "emailToken", value: authToken.token as string }
  //     });
  //     if (!validToken.success) {
  //       useToken.clear({ tokenName: "emailToken" });
  //       return router.replace("/login");
  //     }
  //   };
  //   validToken();
  // }, []);

  return (
    <form onSubmit={handleSubmit(handleSubmitData)}>
      <div className="mb-10 w-full">
        <Input
          id="securityCode"
          label="Security Code"
          type="text"
          register={register("securityCode")}
          errors={errors.securityCode}
          autoFocus
          placeholder="*****"
          maxLength={5}
        />
      </div>
      <Button text="Send" disabled={isSubmitting} />
    </form>
  );
};
