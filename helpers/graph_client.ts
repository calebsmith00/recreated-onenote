type ApiHeaders = {
  [key: string]: string;
};

export type ApiFetchOptions = {
  method?: "GET" | "POST";
  headers?: ApiHeaders;
};

class GraphClient {
  #accessToken: string | undefined;

  get token() {
    return this.#accessToken;
  }

  async getAccessToken(code: string) {
    if (typeof window !== "undefined") return;

    /* TOKEN */
    const tokenRequestParamaters = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      client_id: process.env.APP_ID || "",
      redirect_uri: process.env.REDIRECT_URI || "",
      code_verifier: process.env.CODE_VERIFIER || "",
      client_secret: process.env.CLIENT_SECRET || "",
    });

    const tokenRequestOptions = {
      method: "POST",
      body: tokenRequestParamaters,
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
      }),
    };

    const tokenURL =
      "https://login.microsoftonline.com/organizations/oauth2/v2.0/token";

    const requestToken = await fetch(tokenURL, tokenRequestOptions);
    const tokenResponse = await requestToken.json();

    if (!tokenResponse || !tokenResponse.access_token) return;

    this.#accessToken = tokenResponse.access_token;
  }

  async accessTokenExists() {
    const response = await fetch(
      `http://localhost:3000/api/retrieve/client-access`
    );
    const json = await response.json();

    return json;
  }

  async api(
    endpoint: string,
    token: string,
    options: ApiFetchOptions = { method: "GET" },
    body?: any
  ) {
    if (!token) return;
    this.#accessToken = token;

    const response = await fetch(
      `https://graph.microsoft.com/v1.0/me/${endpoint}`,
      {
        ...options,
        headers: new Headers({
          ...options.headers,
          Authorization: `Bearer ${this.#accessToken}`,
        }),
        body: body || undefined,
      }
    );
    const json = await response.json();

    return json;
  }
}

const client = new GraphClient();
export { client };
