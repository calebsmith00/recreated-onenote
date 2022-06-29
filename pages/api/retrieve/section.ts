import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../helpers/graph_client";
import errors from "../../../helpers/errors";
import { ApiFetchOptions } from "../../../helpers/graph_client";
import validateToken from "../../../helpers/validate_token";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") return res.status(200).json(errors.invalid_request);
  const token = validateToken(req);
  const body = JSON.parse(req.body);
  if (typeof token !== "string") return res.status(400).json(token);
  if (body === undefined) return res.status(400).json(errors.invalid_entry);

  try {
    const section = await client.api(
      `onenote/notebooks/${body.notebookID}/sections?$filter=displayName eq '${body.displayName}'`,
      token
    );

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
    console.log(err);
    return res.status(400).json(errors.invalid_request);
  }
}
