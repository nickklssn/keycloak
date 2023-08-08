const { Issuer } = require("openid-client");
const { client1Config } = require("./config.js");
const issuerUrl = "http://localhost:8080/realms/myrealm";

var client1 = null;

(async function () {
  const issuer1 = await Issuer.discover(issuerUrl);
  client1 = new issuer1.Client(client1Config);
})();

function getAuthUrl1(code_challenge) {
  const url = client1.authorizationUrl({
    scope: "openid email profile",
    code_challenge,
    code_challenge_method: "S256",
  });
  return url;
}

function getCallbackParams1(req){
    return client1.callbackParams(req);
}

async function generateTokenset1(callbackUri, params, code_verifier){
    const tokenset = await client1.callback(callbackUri, params, code_verifier );
    return tokenset
}


async function isActive1(accessToken) {
    const isActive = await client1.introspect(accessToken);
    console.log("test", isActive)
  
    if (isActive.active == false) {
      return false;
    } else {
      return true;
    }
  }
  
  async function getUserRoles1(accessToken){
    const isActive = await client1.introspect(accessToken)
  
    if(isActive.active == false){
      return null
    }
    else{
      return isActive.realm_access.roles
    }
  }

  async function regenerateToken1(refreshToken) {
    const newTokenset = await client1.refresh(refreshToken);
    console.log(newTokenset)
    return newTokenset
  }




module.exports = { getAuthUrl1, getCallbackParams1, generateTokenset1, getUserRoles1, isActive1, regenerateToken1 };
