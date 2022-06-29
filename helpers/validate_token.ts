import { NextApiRequest } from "next";
import errors from "./errors";

export default function validateToken(req: NextApiRequest) {
  if (!req.cookies) return errors.invalid_token;
  if (!req.cookies.token || req.cookies.token === "")
    return errors.invalid_token;

  return req.cookies.token;
}
