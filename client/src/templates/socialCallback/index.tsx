"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "@/shared/lib/features/user-slice";
import { useToken } from "@/shared/hooks";
import { redirect } from "next/navigation";

const SocialCallback = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleSocialLogin = async () => {
      try {
        const { token } = useToken.get({
          tokenName: "accessToken"
        });
        const validToken = await useToken.valid({
          token: { name: "accessToken", value: token as string }
        });
        if (!validToken.success)
          throw new Error("Error during token validation");

        validToken.token = { ...validToken.token, logged: true };
        dispatch(setUser(validToken.token));

        return router.push("/");
      } catch (error) {
        console.log(error);
        const message =
          error instanceof Error ? error.message : "Failed to fetch user data";
        toast.error(message);
        return router.replace("/login");
      }
    };

    handleSocialLogin();
  }, [redirect, router, dispatch]);

  return <div>Loading...</div>;
};

export default SocialCallback;
