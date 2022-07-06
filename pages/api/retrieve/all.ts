/**
 * @packageDocumentation
 * @module RetrieveAllContent
 */

import { NextApiRequest, NextApiResponse } from "next";
/*
  BODY PARAMETERS:
  notebookName?: string;
  sectionName?: string;
  pageTitle?: string;
*/

/**
 * @category ApiPages
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200);

  return;
}
