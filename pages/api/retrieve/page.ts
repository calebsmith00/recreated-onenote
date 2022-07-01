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
    const page = await client.api(
      `onenote/sections/${body.sectionID}/pages?$filter=title eq '${body.title}'`,
      token
    );

    if (page.error) return res.status(400).json(errors.invalid_request);
    if (page.value.length > 0) return res.status(200).json(page.value[0]); // Returns the current page if one exists
    const createPage = await fetch("http://localhost:3000/api/create/page", {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: token,
      },
      body: JSON.stringify(body),
    });
    const json = await createPage.json();

    res.status(200).json(json);
  } catch (err) {
    console.log(err);
    return res.status(400).json(errors.invalid_request);
  }
}
