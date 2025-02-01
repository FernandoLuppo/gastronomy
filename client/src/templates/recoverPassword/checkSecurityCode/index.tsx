import { Form } from "./components/form";
import { cookies } from "next/headers";
import { useToken } from "@/shared/hooks";
import { redirect } from "next/navigation";
import { IoIosLock } from "react-icons/io";

const CheckSecurityCode = () => {
  const token = cookies().get("emailToken");
  useToken.valid({ token, redirect });

  return (
    <main className="flex-center lg:min-h-screen dark:bg-dark-background-gradient bg-background-gradient">
      <section className="p-8 lg:p-10 mx-5 bg-card-light dark:bg-card-black shadow-default rounded-lg max-w-[410px]">
        <div className="flex-center gap-2 mb-5">
          <IoIosLock
            size={40}
            className="text-default-black dark:text-default-white"
          />
          <h1 className="text-default-black dark:text-default-white text-3xl">
            Forgot Password
          </h1>
        </div>

        <p className="text-gray-600 dark:text-gray-400  mb-10">
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

export default CheckSecurityCode;
