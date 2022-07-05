import { NextApiRequest, NextApiResponse } from "next";

/*
  BODY PARAMETERS:
  notebookName?: string;
  sectionName?: string;
  pageTitle?: string;
*/

/**
 * API route is used to request all available data from OneNote (notebook(s), section(s), page(s))
 * @category API Routes
 * @namespace RetrieveAllContent
 * @param body {string} Value
 * @function
 * @returns Response code
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200);

  return;
}
