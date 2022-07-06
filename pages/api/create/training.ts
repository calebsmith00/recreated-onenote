/**
 * @packageDocumentation
 * @module CreateTraining
 */

import { NextApiRequest, NextApiResponse } from "next";
import errors from "../../../helpers/errors";
import { client } from "../../../helpers/graph_client";
import validateBody from "../../../helpers/validate_body";
import validateToken from "../../../helpers/validate_token";
import { parse } from "node-html-parser";

/*
  BODY PARAMETERS:
  pageID: string;
  trainingTitle: string;
*/

/**
 * Endpoint: /api/create/training
 * @category ApiPages
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET")
      return res.status(200).json(errors.invalid_request);
    const token = validateToken(req);
    const body = validateBody(req.body);
    if (typeof token !== "string")
      return res.status(400).json(errors.invalid_token);

    if (!body) return res.status(400).json(errors.invalid_entry);

    const pageContent = await fetch(
      "http://localhost:3000/api/retrieve/page-content",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          pageID: body.pageID || "",
        }),
        credentials: "include",
      }
    );
    const html = await pageContent.text();

    const parsedHTML = parse(html);
    const tableID = parsedHTML.getElementsByTagName("table")[0].id;
    parsedHTML
      .getElementsByTagName(`table`)[0]
      .insertAdjacentHTML(
        "beforeend",
        `<tr><td>${body.trainingTitle}</td><td><b>TODO</b></td><td><b>TODO</b></td><td><b>TODO</b></td></tr>`
      );

    const updatePageBody = JSON.stringify([
      {
        target: tableID,
        action: "replace",
        content: parsedHTML.getElementsByTagName("table").toString(),
      },
    ]);

    const response = await client.api(
      `onenote/pages/${req.body.pageID}/content`,
      token,
      updatePageBody,
      "html",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json({ message: "Hello", response });
  } catch (e) {
    console.error(`Error has occurred at /api/create/training ${e}`);
    res.status(400).json({ error: true });
  }
}
