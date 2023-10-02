require("dotenv").config();
const { Issuer, generators } = require("openid-client");

var client = null;

(async function () {
  const keycloakIssuer = await Issuer.discover(
    process.env.WELLKNOWN_CONFIG
  );

  client = new keycloakIssuer.Client({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uris: [process.env.REDIRECT_URI],
    response_types: [process.env.RESPONSE_TYPES],
    id_token_signing_alg_values_supported: process.env.ID_TOKEN_SIGNING_ALG_VALUES_SUPPORTED,
  });
})();



function getCallbackParams(request) {
  return client.callbackParams(request);
}

function getAuthUrl(code_challenge) {
  return client.authorizationUrl({
    scope: "openid email profile",
    code_challenge,
    code_challenge_method: "S256",
  });
}

function getLogoutUrl(){
  return client.endSessionUrl()
}

async function generateTokenset(params, code_verifier) {
  const tokenSet = await client.callback("http://webapp.local:3000/login/cb", params, code_verifier);
  return tokenSet;
}

async function regenerateToken(refreshToken) {
  const newTokenset = await client.refresh(refreshToken);
  return newTokenset
}

async function revokeToken(token){
  await client.revoke(token)
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
    return []
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
  getUserRoles,
  getLogoutUrl,
  revokeToken,
};
