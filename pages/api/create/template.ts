import { NextApiRequest, NextApiResponse } from "next";
import errors from "../../../helpers/errors";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = JSON.parse(req.body);
  if (!body || !body.templateName)
    return res.status(400).json(errors.invalid_entry);
  const options: RequestInit = {
    method: "POST",
    credentials: "include",
    headers: new Headers({
      Cookie: `${JSON.stringify(req.cookies)}`,
    }),
    body: JSON.stringify({
      displayName: "Master Notebooks",
    }),
  };
  const notebook = await fetch(
    "http://localhost:3000/api/retrieve/notebook",
    options
  );
  const notebookJson = await notebook.json();
  if (notebookJson.error) return res.status(400).json(errors.invalid_request);
  const notebookID = notebookJson.id;

  options.body = JSON.stringify({
    displayName: "Training List",
    notebookID,
  });

  const section = await fetch(
    "http://localhost:3000/api/retrieve/section",
    options
  );
  const sectionJson = await section.json();
  if (sectionJson.error) return res.status(400).json(errors.invalid_request);
  const sectionID = sectionJson.id;

  options.body = JSON.stringify({
    html: `
      <html>
      <head><title>${body.templateName}</title></head>
      <body></body>
      </html>
    `,
    sectionID,
    title: body.templateName,
  });
  const page = await fetch("http://localhost:3000/api/retrieve/page", options);
  const pageJson = await page.json();

  if (pageJson.error) return res.status(400).json(errors.invalid_request);
  res.status(200).json({
    success: true,
    message: "Template created successfully!",
    page: pageJson,
  });
}
