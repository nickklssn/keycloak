require("dotenv").config();
const { Issuer, generators } = require("openid-client");

var client = null;

//initialize openid client keycloak
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



//parameter for auth callback
function getCallbackParams(request) {
  return client.callbackParams(request);
}

//get auth endpoint
function getAuthUrl(code_challenge) {
  return client.authorizationUrl({
    scope: "openid email profile",
    code_challenge,
    code_challenge_method: "S256",
  });
}

//get end session endpoint
function getLogoutUrl(){
  return client.endSessionUrl()
}

//generate token set
async function generateTokenset(params, code_verifier) {
  const tokenSet = await client.callback("http://webapp.local:3000/login/cb", params, code_verifier);
  return tokenSet;
}

//generate new token set after expiration
async function regenerateToken(refreshToken) {
  const newTokenset = await client.refresh(refreshToken);
  return newTokenset
}

//annul token
async function revokeToken(token){
  await client.revoke(token)
}

//code verifier for PKCE
function generateCodeVerifier() {
  return generators.codeVerifier();
}

//code challenge for PKCE
function generateCodeChallenge(codeVerifier) {
  return generators.codeChallenge(codeVerifier);
}

//check if access token is still active
async function isActive(accessToken) {
  const isActive = await client.introspect(accessToken);
  return isActive.active ? true : false;
}

//get all user roles from an access token
async function getUserRoles(accessToken){
  const isActive = await client.introspect(accessToken)
  return isActive.active ? isActive.realm_access.roles : [];
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
