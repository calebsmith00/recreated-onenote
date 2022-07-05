import { NextApiRequest } from "next";
import { getCookieParser } from "next/dist/server/api-utils";
import errors from "./errors";

export default function validateToken(req: NextApiRequest) {
  try {
    if (req.cookies.token && typeof req.cookies === "object")
      return req.cookies.token;

    if (req.headers.authorization) {
      const isBearer = req.headers.authorization.substring(0, 6) === "Bearer";
      return isBearer
        ? req.headers.authorization.substring(7)
        : req.headers.authorization;
    }

    if (req.headers.cookie) {
      const cookies = JSON.parse(req.headers.cookie);
      return cookies.token;
    }

    return errors.invalid_token;
  } catch (e) {
    console.error(`Error at validateToken: ${e}`);
    return errors.invalid_token;
  }
}
