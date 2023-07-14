require("dotenv").config();
const { Issuer, generators } = require("openid-client");

async function createClient() {
  const keycloakIssuer = await Issuer.discover(
    process.env.KC_ISSUER
  );

  const client = new keycloakIssuer.Client({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uris: [process.env.REDIRECT_URI],
    response_types: [process.env.RESPONSE_TYPE],
    id_token_signing_alg_values_supported: process.env.ID_TOKEN_SIGNING_ALG_VALUES_SUPPORTED,  
  });

  return { client };
}

async function getCallbackParams(request){
  return (await createClient()).client.callbackParams(request)
}


async function getAuthUrl() {
  return (await createClient()).client.authorizationUrl();
}

function generateCodeVerifier(){
  return generators.codeVerifier()
}

function generateCodeChallenge(codeVerifier){
  return generators.codeChallenge(codeVerifier)
}

module.exports = { generateCodeChallenge, generateCodeVerifier, getAuthUrl, getCallbackParams};