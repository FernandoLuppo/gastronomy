import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

const chosenTokenSecret = ({
  tokenName
}: {
  tokenName: "accessToken" | "refreshToken" | "emailToken";
}) => {
  console.log({ tokenName });

  const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, EMAIL_TOKEN_SECRET } =
    process.env;
  console.log({
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    EMAIL_TOKEN_SECRET
  });

  const tokens = {
    accessToken: ACCESS_TOKEN_SECRET,
    refreshToken: REFRESH_TOKEN_SECRET,
    emailToken: EMAIL_TOKEN_SECRET
  };

  return tokens[tokenName];
};

export async function GET(req: NextRequest) {
  try {
    const reqToken = req.nextUrl.searchParams.get("token");
    if (!reqToken) throw new Error("Token is missing");

    const token = JSON.parse(reqToken);
    const tokenSecret = chosenTokenSecret({ tokenName: token.name });
    console.log({ tokenSecret });
    if (!tokenSecret) throw new Error("Token name is wrong");

    const decodedToken = verify(token.value, tokenSecret) as {
      sub: string;
      content: any;
    };

    console.log(decodedToken);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error });
  }
}
