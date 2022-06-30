import { NextApiRequest } from "next";
import errors from "./errors";

function foundCookie(cookie: string) {
  try {
    //if (typeof window === undefined) return false;
    const parsed = JSON.parse(cookie);
    if (parsed && typeof parsed === "object") return parsed;
  } catch (e) {
    return false;
  }

  return false;
}

export default function validateToken(req: NextApiRequest) {
  //const cookies = req.headers.cookie || "";
  // if (req.cookies !== JSON.parse(cookies)) {
  //   req.cookies = JSON.parse(cookies);
  // }
  const cookie = foundCookie(JSON.stringify(req.cookies));

  if (!req.cookies) return errors.invalid_token;
  if (!req.cookies.token || req.cookies.token === "")
    return errors.invalid_token;

  return cookie.token;
}
