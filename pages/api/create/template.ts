import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../helpers/graph_client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.body) return;
  const body = JSON.parse(req.body);
  const validEntry = Object.values(body).find(
    (entry) => entry === "" || typeof entry !== "string"
  );

  if (validEntry === "undefined" || validEntry === "")
    return res
      .status(400)
      .json({ error: true, message: "Invalid entry sent to server. " });

  client.api("/onenote/notebooks", req.cookies, { method: "POST" });
  res.status(200).json({ message: "Hello" });
}
