const { Issuer, generators} = require("openid-client");

const { client1Config, client2Config, issuerUrl } = require("./config.js");




async function initializeIssuer() {
  const issuer = await Issuer.discover(issuerUrl);
  return issuer
};

async function initializeClient1() {
  const issuer = await initializeIssuer()
  const client1 = new issuer.Client(client1Config);
  return client1
};

async function initializeClient2() {
  const issuer = await initializeIssuer()
  const client2 = new issuer.Client(client2Config);
  return client2
};

function generateCodeVerifier(){
  return generators.codeVerifier()
}

function generateCodeChallenge(codeVerifier){
  return generators.codeChallenge(codeVerifier)
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
  initializeClient1, initializeClient2, generateCodeChallenge, generateCodeVerifier
}
