const {generators} = require("openid-client");


function generateCodeVerifier(){
  return generators.codeVerifier()
}

function generateCodeChallenge(codeVerifier){
  return generators.codeChallenge(codeVerifier)
}



module.exports = {
    generateCodeChallenge, generateCodeVerifier
}