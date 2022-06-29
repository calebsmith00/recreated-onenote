import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = JSON.stringify({
    displayName: req.body.templateName,
  });
  const options: RequestInit = {
    method: "POST",
    credentials: "include",
    headers: new Headers({
      Cookie: `${JSON.stringify(req.cookies)}`,
    }),
    body,
  };
  const thing = await fetch(
    "http://localhost:3000/api/retrieve/notebook",
    options
  );

  res.status(200).json({ message: "TEST" });
}
