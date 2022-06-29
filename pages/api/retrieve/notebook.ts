import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../auth/msal_provider";
import errors from "../../../helpers/errors";
import { ApiFetchOptions } from "../../../helpers/graph_client";
import validateToken from "../../../helpers/validate_token";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") return res.status(200).json(errors.invalid_request);
  req.cookies = JSON.parse(req.headers.cookie || "");
  const token = validateToken(req);
  const body = req.body;
  if (typeof token !== "string") return res.status(400).json(token);
  if (body === undefined) return res.status(400).json(errors.invalid_entry);

  try {
    const notebook = await client.api(
      `onenote/notebooks?$filter=displayName eq '${body.displayName}''`
    );

    if (notebook.value.length > 0) return res.status(200).json(notebook.value); // Returns the current notebook if one exists
    //await fetch("api/create/notebook");
  } catch (err) {
    return res.status(400).json(errors.invalid_request);
  }
}
