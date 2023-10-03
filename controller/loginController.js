const {
  generateCodeChallenge,
  generateCodeVerifier,
  getAuthUrl,
} = require("../keycloak/client.js");

const login = (_req, res, next) => {
  try {
    //generate code challenge and code verifier for PKCE
    const code_verifier = generateCodeVerifier();
    const code_challenge = generateCodeChallenge(code_verifier);
    res.cookie("code_verifier", code_verifier, { domain: "webapp.local", path:"/login/cb" ,httpOnly: true});
    res.redirect(getAuthUrl(code_challenge)); //redirect to auth endpoint in keycloak
    next();
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = login;
