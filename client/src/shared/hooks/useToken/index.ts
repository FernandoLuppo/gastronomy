import cookies from "js-cookie";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { RedirectType } from "next/navigation";

interface IUseToken {
  tokenName: string;
}

interface IValid {
  token: { name: string; value: string } | undefined;
  redirect: (url: string, type?: RedirectType) => never;
}

const useToken = {
  get: async ({ tokenName }: IUseToken) => {
    const token = cookies.get(tokenName);
    if (!token) return { success: false, error: "Token is missing" };
    return { success: true, token };
  },

  clear: async ({ tokenName }: IUseToken) => {
    cookies.remove(tokenName);
    return { success: true };
  },

  valid: async ({ token, redirect }: IValid) => {
    try {
      if (!token) throw new Error("Token is missing");

      const response = await fetch(
        `http://localhost:3001/api/token?token=${JSON.stringify(token)}`,
        {
          method: "GET"
        }
      );
      const data = await response.json();
      if (!data || !data.success)
        throw new Error("Error during token validation!");

      return;
    } catch (error) {
      console.log(error);
      return redirect("/login");
    }
  }
};

export { useToken };
