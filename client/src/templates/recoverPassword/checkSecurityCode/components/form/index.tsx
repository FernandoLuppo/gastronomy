"use client";

import { Button, Input } from "@/shared/components";
import { useRouter } from "next/navigation";
import { handleForm, submitData } from "../../functions";
import { IRecoverPasswordCheckSecurityCodeValues } from "@/shared/types";

export const Form = () => {
  const route = useRouter();
  const { errors, handleSubmit, isSubmitting, register, reset } = handleForm();
  const handleSubmitData = async (
    body: IRecoverPasswordCheckSecurityCodeValues
  ) => await submitData({ reset, route, body });

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
