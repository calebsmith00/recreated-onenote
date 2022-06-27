import { NextApiRequest, NextApiResponse } from "next";
const cookie = require("cookie");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookies = cookie.parse(req.headers.cookie || "");

  console.log(cookies);
  res.status(200).json({ message: "Hello" });
}
