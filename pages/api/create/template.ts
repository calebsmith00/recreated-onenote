import { NextApiRequest, NextApiResponse } from "next";
import { ApiFetchOptions, client } from "../../../helpers/graph_client";
import errors from "../../../helpers/errors";
import validateToken from "../../../helpers/validate_token";
import { IdentityApiConnector } from "@microsoft/microsoft-graph-types";

async function notebookExists(token: string, notebookName: string) {
  const notebook = await client.api(
    `onenote/notebooks?$filter=displayName eq '${notebookName}'`,
    token
  );

  if (notebook.value.length < 1) return false;
  return notebook.value[0].id;
}

async function createNotebook(token: string, displayName: string) {
  const options: ApiFetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    displayName,
  });
  const notebook = await client.api(`onenote/notebooks`, token, options, body);

  return notebook;
}

async function sectionExists(
  token: string,
  sectionName: string,
  notebookID: string
) {
  const section = await client.api(
    `onenote/notebooks/${notebookID}/sections?$filter=displayName eq '${sectionName}' `,
    token
  );

  if (section.value.length > 0) return section.value;
  return false;
}

async function createSection(
  token: string,
  displayName: string,
  notebookID: string
) {
  const body = JSON.stringify({
    displayName,
  });

  const options: ApiFetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const section = await client.api(
    `onenote/notebooks/${notebookID}/sections`,
    token,
    options,
    body
  );

  return section;
}

async function pageExists(token: string, pageTitle: string, sectionID: string) {
  const page = await client.api(
    `onenote/sections/${sectionID}/pages?$filter=title eq '${pageTitle}'`,
    token
  );

  if (page.value.length > 0) return page.value;
  return false;
}

async function createPage(token: string, pageTitle: string, sectionID: string) {
  const body = `
    <html>
      <head><title>${pageTitle}</title>
      <body></body>
    </html>
  `;

  const options: ApiFetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "text/html",
    },
  };

  const page = await client.api(
    `onenote/sections/${sectionID}/pages`,
    token,
    options,
    body
  );

  return page;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.body) return;
  const body = JSON.parse(req.body);
  const token = validateToken(req);

  // Validates the entry by determining if the body is a valid string.
  const isInvalidEntry = Object.values(body).find((entry) => entry === "");
  if (isInvalidEntry !== undefined || isInvalidEntry === "")
    return res.status(400).json(errors.invalid_entry);

  if (typeof token !== "string") return res.status(400).json(token);
  const foundNotebook = await notebookExists(token, "Master Notebooks");
  if (!foundNotebook) await createNotebook(token, "Master Notebooks");

  const foundSection = await sectionExists(
    token,
    "Training List",
    foundNotebook
  );
  if (!foundSection) await createSection(token, "Training List", foundNotebook);

  const foundPage = await pageExists(
    token,
    body.templateName,
    foundSection[0].id
  );

  if (!foundPage)
    await createPage(token, body.templateName, foundSection[0].id);

  res.status(200).json({ message: "Hello" });
}
