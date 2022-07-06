/**
 * @packageDocumentation
 * @module CreatePage
 */

import { NextApiRequest, NextApiResponse } from "next";
import errors from "../../../helpers/errors";
import { ApiFetchOptions, client } from "../../../helpers/graph_client";
import validateToken from "../../../helpers/validate_token";

/**
 * @category ApiPages
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = validateToken(req);
  const body = JSON.parse(req.body || "");

  if (typeof token !== "string")
    return res.status(400).json(errors.invalid_token);
  if (!body) return res.status(400).json(errors.invalid_entry);
  const options: ApiFetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "text/html",
    },
  };

  const page = await client.api(
    `onenote/sections/${body.sectionID}/pages`,
    token,
    body.html,
    "json",
    options
  );

  res.status(200).json(page);
}
