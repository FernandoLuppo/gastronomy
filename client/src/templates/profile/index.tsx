"use client";

import { useDispatch } from "react-redux";
import { handleForm, submitData } from "./functions";
import { IUpdateUserInfosValues } from "@/shared/types";
import { Title, Form } from "./components";
import { useToken } from "@/shared/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { authError } from "@/shared/utils";

const Profile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { errors, handleSubmit, isSubmitting, register, reset } = handleForm();
  const handleSubmitData = async (body: IUpdateUserInfosValues) =>
    await submitData({ reset, body, dispatch });

  useEffect(() => {
    const validUser = async () => {
      const authToken = useToken.get({
        tokenName: "accessToken"
      });
      if (!authToken.success) {
        useToken.clear({ tokenName: "accessToken" });
        useToken.clear({ tokenName: "refreshToken" });
        return authError({ dispatch, router });
      }

      const validToken = await useToken.valid({
        token: { name: "accessToken", value: authToken.token as string }
      });
      if (!validToken.success) {
        useToken.clear({ tokenName: "accessToken" });
        useToken.clear({ tokenName: "refreshToken" });
        return authError({ dispatch, router });
      }
    };
    validUser();
  }, []);

  return (
    <main>
      <section className="max-w-xl m-auto py-8 md:py-16 px-8">
        <form
          onSubmit={handleSubmit(handleSubmitData)}
          className="flex flex-col flex-1 p-8 md:p-16 justify-center rounded-2xl bg-card-light dark:bg-card-black shadow-default"
        >
          <Title />
          <Form
            errors={errors}
            isSubmitting={isSubmitting}
            register={register}
          />
        </form>
      </section>
    </main>
  );
};

export default Profile;
