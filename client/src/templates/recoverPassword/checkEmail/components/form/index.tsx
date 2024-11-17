"use client";

import { IRecoverPasswordCheckEmailFormValues } from "@/shared/types";
import { handleForm, submitData } from "../../functions";
import { useRouter } from "next/navigation";
import { Button, Input } from "@/shared/components";

export const Form = () => {
  const route = useRouter();
  const { errors, handleSubmit, isSubmitting, register, reset } = handleForm();
  const handleSubmitData = async (body: IRecoverPasswordCheckEmailFormValues) =>
    await submitData({ reset, route, body });

  return (
    <form onSubmit={handleSubmit(handleSubmitData)} className="w-full">
      <div className="mb-10 w-full">
        <Input
          id="email"
          label="Email"
          type="email"
          register={register("email")}
          errors={errors.email}
          autoFocus
          placeholder="your-email@gmail.com"
        />
      </div>
      <Button text="Send" disabled={isSubmitting} />
    </form>
  );
};
