require("dotenv").config();
const { Issuer, TokenSet } = require("openid-client");

var client = null;

(async function() {
  const keycloakIssuer = await Issuer.discover("http://localhost:8080/realms/myrealm");

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

module.exports = {
  getAuthUrl,
  getCallbackParams,
  generateTokenset,
  isValid,
  regenerateToken
};
