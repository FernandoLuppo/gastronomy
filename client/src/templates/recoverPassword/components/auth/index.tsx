"use client";

import { useToken } from "@/shared/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const Auth = () => {
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

  return <div></div>;
};
