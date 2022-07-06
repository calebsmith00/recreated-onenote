/**
 * @packageDocumentation
 * @module AuthorizeUser
 */

import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import { client } from "../../../helpers/graph_client";

/**
 * @category ApiPages
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.query.code || typeof req.query.code !== "string")
    return res
      .status(400)
      .json({ error: true, message: "Invalid parameters sent to client." });

  await client.getAccessToken(req.query.code);

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", client.token || "", { path: "/", httpOnly: true })
  );
  res.redirect("http://localhost:3000");
}
