require("dotenv").config();
const { Issuer, TokenSet } = require("openid-client");

async function createClient() {
  const keycloakIssuer = await Issuer.discover("http://localhost:8080/realms/myrealm");

  const client = new keycloakIssuer.Client({
    client_id: "myclient",
    client_secret: "xD0VuRQnZnGu0eDyGXEjn8yx52IbdO0A",
    redirect_uris: ["http://localhost:3000/login/cb"],
    response_types: ["code"],
    id_token_signing_alg_values_supported:
    "RS256",
  });

  return { client };
}

async function getCallbackParams(request) {
  return (await createClient()).client.callbackParams(request);
}

async function getAuthUrl() {
  return (await createClient()).client.authorizationUrl({
    scope: "openid email profile",
  });
}


async function generateTokenset(callbackUri, params) {
  const {client} = await createClient()
  const tokenSet = await client.callback(callbackUri, params)
  return tokenSet
}

async function isValid(tokenset){
  const newTokenset = new TokenSet(tokenset)
  if(newTokenset.expired()) return false
  else return true
}

async function regenerateToken(refreshToken){
  const {client} = await createClient()
  const newTokenset = client.refresh(refreshToken)
  return newTokenset
}

module.exports = {
  getAuthUrl,
  getCallbackParams,
  generateTokenset,
  isValid,
  regenerateToken
};
