interface IUseApi {
  url: string;
  method: string;
  body?: unknown;
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
    const defaultUrl = isSSR
      ? process.env.NEXT_PUBLIC_API_DOCKER_URL
      : process.env.NEXT_PUBLIC_API_URL;

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
    if (!data.success) throw new Error(data.error);

    return { data, success: true };
  } catch (error) {
    console.log(error);
    const message =
      error instanceof Error
        ? error.message
        : "An unknown error occurred. Please try again later.";
    return { error: message, success: false };
  }
};
