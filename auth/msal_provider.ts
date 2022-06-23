/*
  APP AUTHENTICATION
*/
const { ALT_APP_ID, CLIENT_SECRET, TENANT_ID } = process.env;

const { Client } = require("@microsoft/microsoft-graph-client");
const {
  TokenCredentialAuthenticationProvider,
} = require("@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials");
const { ClientSecretCredential } = require("@azure/identity");

const credential = new ClientSecretCredential(
  TENANT_ID,
  ALT_APP_ID,
  CLIENT_SECRET
);

const authProvider = new TokenCredentialAuthenticationProvider(credential, {
  scopes: [".default"],
});

const client = Client.initWithMiddleware({
  debugLogging: true,
  authProvider,
  // Use the authProvider object to create the class.
});

export { client };

/*
  MSAL AUTHENTICATION
*/
const msal = require("@azure/msal-node");
const pca = new msal.PublicClientApplication({
  auth: {
    clientId: process.env.APP_ID,
    authority: `https://login.microsoftonline.com/${TENANT_ID}`,
  },
});

export { pca };
