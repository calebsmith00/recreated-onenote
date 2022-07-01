export default function validateBody(body: any, typeofBody: string = "object") {
  if (!body) return false;
  try {
    const parsedBody = JSON.parse(JSON.stringify(body));
    if (parsedBody && typeof parsedBody === typeofBody) return parsedBody;
  } catch (e) {
    console.error(`Error found in validate_body.ts: ${e}`);
    return false;
  }
}
