import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../helpers/graph_client";
import errors from "../../../helpers/errors";
import validateToken from "../../../helpers/validate_token";
import validateBody from "../../../helpers/validate_body";

/*
  BODY PARAMETERS:
  sectionID: string;
  title: string;
*/

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") return res.status(200).json(errors.invalid_request);
  const token = validateToken(req);
  const body = validateBody(req.body);
  if (typeof token !== "string") return res.status(400).json(token);
  if (!body) return res.status(400).json(errors.invalid_entry);

  try {
    const pages = await client.api(
      `onenote/sections/${body.sectionID}/pages`,
      token
    );
    if (pages.error) return res.status(400).json(errors.invalid_request);
    if (pages.value.length > 0) return res.status(200).json(pages.value); // Returns the current page if one exists
  } catch (err) {
    console.log(err);
    return res.status(400).json(errors.invalid_request);
  }
}
