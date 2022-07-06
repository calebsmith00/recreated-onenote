/**
 * @packageDocumentation
 * @module RetrieveSection
 */

import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../helpers/graph_client";
import errors from "../../../helpers/errors";
import validateToken from "../../../helpers/validate_token";
import validateBody from "../../../helpers/validate_body";

/* 
  BODY PARAMETERS:
  displayName: string;
  notebookID?: string;
*/

/**
 * Endpoint: /api/retrieve/section
 * @category ApiPages
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // The lines below handle common errors
  if (req.method === "GET") return res.status(200).json(errors.invalid_request);

  const token = validateToken(req);
  const body = validateBody(req.body);

  if (typeof token !== "string") return res.status(400).json(token);
  if (!body) return res.status(400).json(errors.invalid_entry);
  // If all the parameters pass validation, make a query attempt
  const notebookID = body.notebookID
    ? `notebooks/${body.notebookID}/sections`
    : `sections`;
  const sectionRequestURI = `onenote/${notebookID}?$filter=displayName eq '${body.displayName}'`;
  try {
    const section = await client.api(sectionRequestURI, token);
    if (section.error) return res.status(400).json(errors.invalid_request);
    if (section.value.length > 0) return res.status(200).json(section.value[0]); // Returns the current section if one exists
    const createSection = await fetch(
      "http://localhost:3000/api/create/section",
      {
        method: "POST",
        headers: {
          Cookie: JSON.stringify(req.cookies),
        },
        body: JSON.stringify(body),
      }
    );
    const json = await createSection.json();

    res.status(200).json(json);
  } catch (err) {
    console.error(`Error has occurred in /api/retrieve/section: ${err}`);
    return res.status(400).json(errors.invalid_request);
  }
}
