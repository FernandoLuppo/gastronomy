import cookies from "js-cookie";

interface IUseToken {
  tokenName: string;
}

export interface IValid {
  token: { name: string; value: string } | undefined;
}

const useToken = {
  get: ({ tokenName }: IUseToken) => {
    const token = cookies.get(tokenName);
    if (!token) return { success: false, error: "Token is missing" };
    return { success: true, token };
  },

  clear: async ({ tokenName }: IUseToken) => {
    cookies.remove(tokenName);
    return { success: true };
  },

  valid: async ({ token }: IValid) => {
    try {
      if (!token) throw new Error("Token is missing");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/token?token=${JSON.stringify(token)}`,
        {
          method: "GET"
        }
      );
      const data = await response.json();
      if (!data || !data.success)
        throw new Error("Error during token validation!");

      return { token: data.token, success: true };
    } catch (error) {
      console.error(error);
      return { success: false, error };
    }
  }
};

export { useToken };
