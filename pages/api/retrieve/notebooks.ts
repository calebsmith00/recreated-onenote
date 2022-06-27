import { NextApiRequest, NextApiResponse } from "next";
const cookie = require("cookie");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(document.cookie);
  res.status(200).json({ message: "Hello" });
}
