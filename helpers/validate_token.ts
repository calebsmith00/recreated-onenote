import { NextApiRequest } from "next";
import errors from "./errors";

export default function validateToken(req: NextApiRequest) {
  try {
    if (req.cookies.token && typeof req.cookies === "object")
      return req.cookies.token;
  } catch (e) {
    console.error(`Error at validateToken: ${e}`);
    return errors.invalid_token;
  }
}
