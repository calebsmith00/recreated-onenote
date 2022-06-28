import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { cookie } = req.headers;
  const cookies = parse(cookie || "");
  if (cookies.token) return res.status(200).json(cookies);

  res.status(200).json({ message: "Hi" });
}
