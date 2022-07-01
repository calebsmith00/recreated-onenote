import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../helpers/graph_client";
import errors from "../../../helpers/errors";
import validateToken from "../../../helpers/validate_token";
import validateBody from "../../../helpers/validate_body";

/*
  BODY PARAMETERS:
  pageID: string;
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
    const pageContent = await client.api(
      `onenote/pages/${body.pageID}/content?includeIDs=true`,
      token,
      undefined,
      "html"
    );
    if (pageContent.error) return res.status(400).json(errors.invalid_request);
    if (pageContent) return res.status(200).send(pageContent); // Returns the current page content if one exists
  } catch (err) {
    console.log(err);
    return res.status(400).json(errors.invalid_request);
  }
}
