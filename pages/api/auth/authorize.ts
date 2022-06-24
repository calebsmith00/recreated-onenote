import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code } = req.query;
  const { APP_ID, CLIENT_SECRET } = process.env;

  if (typeof code !== "string") return;

  const tokenResponseBody = {
    grant_type: "authorization_code",
    code: code,
    client_id: APP_ID || "0000000000",
    redirect_uri: "http://localhost:3000/api/auth/authorize",
    code_verifier: "thisIsMyCode123",
    client_secret: CLIENT_SECRET || "000000000",
  };

  const body = new URLSearchParams();
  Object.entries(tokenResponseBody).forEach((entry) =>
    body.append(entry[0], entry[1])
  );

  const tokenReponseOptions = {
    method: "POST",
    body,
    headers: new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
    }),
  };
  //7BtZpqFs_Bq9OMamb4NKdjBjI8huQEyzXagBoldMRG0
  const tokenResponse = await fetch(
    "https://login.microsoftonline.com/organizations/oauth2/v2.0/token",
    tokenReponseOptions
  );

  console.log(await tokenResponse.json());
  res.status(200).json({ message: "JSON received, pal" });
}
