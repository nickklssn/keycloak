require("dotenv").config();
const { Issuer, TokenSet, generators } = require("openid-client");

var client = null;

(async function() {
  const keycloakIssuer = await Issuer.discover(process.env.KC_ISSUER);

  client = new keycloakIssuer.Client({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uris: [process.env.REDIRECT_URI],
    response_types: [process.env.RESPONSE_TYPES],
    id_token_signing_alg_values_supported:
      process.env.ID_TOKEN_SIGNING_ALG_VALUES_SUPPORTED,
  });

})();

function getCallbackParams(request) {
  return client.callbackParams(request);
}

function getAuthUrl() {
  return client.authorizationUrl({
    scope: "openid email profile",
  });
}


async function generateTokenset(callbackUri, params) {
  const tokenSet = await client.callback(callbackUri, params)
  return tokenSet
}

function isValid(tokenset){
  const newTokenset = new TokenSet(tokenset)
  if(newTokenset.expired()) return false
  else return true
}

function regenerateToken(refreshToken){
  const newTokenset = client.refresh(refreshToken)
  return newTokenset
}

function generateCodeVerifier() {
  return generators.codeVerifier();
}

function generateCodeChallenge(codeVerifier) {
  return generators.codeChallenge(codeVerifier);
}

module.exports = {
  getAuthUrl,
  getCallbackParams,
  generateTokenset,
  isValid,
  regenerateToken,
  generateCodeVerifier,
  generateCodeChallenge
};