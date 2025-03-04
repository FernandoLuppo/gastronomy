import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

export const dynamic = "force-dynamic";

const chosenTokenSecret = ({
  tokenName
}: {
  tokenName: "accessToken" | "refreshToken" | "emailToken";
}) => {
  const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, EMAIL_TOKEN_SECRET } =
    process.env;

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
    if (!tokenSecret) throw new Error("Token name is wrong");

    const decodedToken = verify(token.value, tokenSecret) as {
      sub: string;
      content: any;
    };

    delete decodedToken.content.password;
    console.log(" ");
    console.log({ decodedToken });
    console.log(" ");

    return NextResponse.json({ success: true, token: decodedToken.content });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error });
  }
}
