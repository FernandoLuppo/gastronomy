import { handleError } from "@/shared/utils";

interface IUseApi {
  url: string;
  method: string;
  body?: any;
  cache?: boolean;
  token?: string | { accessToken: string; refreshToken: string };
}

export const useApi = async ({
  method,
  url,
  body,
  cache = true,
  token
}: IUseApi) => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
      method: method.toUpperCase(),
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      credentials: "include",
      mode: "cors",
      cache: cache ? "default" : "no-cache"
    });
    const data = await response?.json();

    if (!data.success) {
      throw new Error(data.error, {
        cause: {
          status: response.status,
          message: data?.error || "Server Unknown Error"
        }
      });
    }

    return data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};
