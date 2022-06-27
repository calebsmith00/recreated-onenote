import { NextApiRequest, NextApiResponse } from "next";
import GraphClient from "../../../helpers/graph_client";
import cookie from "cookie";
const client = new GraphClient();

export { client };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookies = cookie.parse(req.headers.cookie || "");

  console.log(cookies);
  if (!req.query.code || typeof req.query.code !== "string")
    return res
      .status(400)
      .json({ error: true, message: "Invalid parameters sent to client." });

  await client.getAccessToken(req.query.code);

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", client.token || "", { path: "/" })
  );
  res.redirect("http://localhost:3000");
}
