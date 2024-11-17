import Image from "next/image";
import { Form } from "./components";
import { cookies } from "next/headers";
import { useToken } from "@/shared/hooks";
import { redirect } from "next/navigation";

const NewPassword = () => {
  const token = cookies().get("emailToken");
  useToken.valid({ token, redirect });

  return (
    <main className="flex-center  lg:min-h-screen background-gradient">
      <section className="p-8 lg:p-10 mx-5 bg-card-light shadow-default rounded-lg max-w-[410px]">
        <div className="flex-center gap-2 mb-5">
          <Image
            src="/icons/lock.svg"
            alt="Lock icon"
            width={35}
            height={39}
            className=""
          />
          <h1 className="text-default-black text-3xl">Forgot Password</h1>
        </div>

        <p className="text-gray-600 mb-10">
          Enter down below the email address you used to register, and we will
          send you a token to reset your password
        </p>
        <Form />
      </section>
      <div className="fixed bottom-12 right-5 lg:right-12">
        <span>&copy; All rights reserved</span>
      </div>
    </main>
  );
};

export default NewPassword;
