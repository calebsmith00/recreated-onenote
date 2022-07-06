/**
 * @packageDocumentation
 * @module CreateNotebook
 */

import { NextApiRequest, NextApiResponse } from "next";
import errors from "../../../helpers/errors";
import { ApiFetchOptions, client } from "../../../helpers/graph_client";
import validateToken from "../../../helpers/validate_token";

/**
 * Endpoint: /api/create/notebook
 * @category ApiPages
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = validateToken(req);
  if (typeof token !== "string")
    return res.status(400).json(errors.invalid_token);
  if (!req.body) return res.status(400).json(errors.invalid_entry);

  const options: ApiFetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const notebook = await client.api(
    "onenote/notebooks",
    token,
    options,
    req.body
  );

  res.status(200).json(notebook);
}
