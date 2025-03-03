import { handleError } from "@/shared/utils";

interface IUseApi {
  url: string;
  method: string;
  body?: any;
  cache?: "default" | "force-cache" | "no-cache" | "no-store";
  token?: string | { accessToken: string; refreshToken: string };
  isSSR?: boolean;
}

export const useApi = async ({
  method,
  url,
  body,
  cache,
  token,
  isSSR = false
}: IUseApi) => {
  try {
    const { NEXT_PUBLIC_API_DOCKER_URL, NEXT_PUBLIC_API_URL } = process.env;
    const defaultUrl = isSSR ? NEXT_PUBLIC_API_DOCKER_URL : NEXT_PUBLIC_API_URL;
    const response = await fetch(defaultUrl + url, {
      method: method.toUpperCase(),
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      credentials: "include",
      mode: "cors",
      cache: cache ? cache : "no-cache"
    });
    const data = await response?.json();
    console.log("DATA: ", { data });

    if (!data.success) {
      throw new Error(data.error, {
        cause: {
          status: response.status || "500",
          message: data?.error?.message || "Server Unknown Error"
        }
      });
    }

    return { data, success: true, error: "" };
  } catch (error) {
    return handleError(error as any);
  }
};
