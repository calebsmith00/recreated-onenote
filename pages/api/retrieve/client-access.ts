import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookies = cookie.parse(req.headers.cookie || "");
  if (cookies.token) return res.status(200).json(cookies);

  res.status(200).json({ message: "Hi" });
}
