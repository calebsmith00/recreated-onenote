import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code } = req.query;
  const { APP_ID, CLIENT_SECRET, REDIRECT_URI, CODE_VERIFIER } =
    process.env || "";
  if (
    typeof code !== "string" ||
    !code ||
    !APP_ID ||
    !CLIENT_SECRET ||
    !REDIRECT_URI ||
    !CODE_VERIFIER
  )
    return res
      .status(400)
      .json({ error: true, message: "Invalid paramaters sent to server." });

  const tokenResponseBody = {
    grant_type: "authorization_code",
    code: code,
    client_id: APP_ID,
    redirect_uri: REDIRECT_URI,
    code_verifier: CODE_VERIFIER,
    client_secret: CLIENT_SECRET,
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

  const requestToken = await fetch(
    "https://login.microsoftonline.com/organizations/oauth2/v2.0/token",
    tokenReponseOptions
  );
  const tokenResponse = await requestToken.json();

  if (tokenResponse.access_token)
    return res.status(200).redirect("http://localhost:3000");
  res
    .status(200)
    .json({ message: "No bearer token was received from server." });
}
