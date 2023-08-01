require("dotenv").config();
const { Issuer, TokenSet, generators } = require("openid-client");

var client = null;

(async function () {
  const keycloakIssuer = await Issuer.discover(
    "http://localhost:8080/realms/myrealm"
  );

  client = new keycloakIssuer.Client({
    client_id: "myclient",
    client_secret: "xD0VuRQnZnGu0eDyGXEjn8yx52IbdO0A",
    redirect_uris: ["http://localhost:3000/login/cb"],
    response_types: ["code"],
    id_token_signing_alg_values_supported: "RS256",
  });
})();

function getCallbackParams(request) {
  return client.callbackParams(request);
}

function getAuthUrl(code_challenge) {
  return client.authorizationUrl({
    scope: "openid email profile",
    resource: "http://localhost:3001/data",
    code_challenge,
    code_challenge_method: "S256",
  });
}

async function generateTokenset(callbackUri, params, code_verifier) {
  const tokenSet = await client.callback(callbackUri, params, code_verifier);
  return tokenSet;
}

async function regenerateToken(refreshToken) {
  const newTokenset = await client.refresh(refreshToken);
  console.log(newTokenset)
  return newTokenset
}

function generateCodeVerifier() {
  return generators.codeVerifier();
}

function generateCodeChallenge(codeVerifier) {
  return generators.codeChallenge(codeVerifier);
}

async function isActive(accessToken) {
  const isActive = await client.introspect(accessToken);
  console.log("test", isActive)

  if (isActive.active == false) {
    return false;
  } else {
    return true;
  }
}

async function getUserRoles(accessToken){
  const isActive = await client.introspect(accessToken)

  if(isActive.active == false){
    return null
  }
  else{
    return isActive.realm_access.roles
  }
}

module.exports = {
  getAuthUrl,
  getCallbackParams,
  generateTokenset,
  regenerateToken,
  generateCodeVerifier,
  generateCodeChallenge,
  isActive,
  getUserRoles
};
