const {
  generateCodeChallenge,
  generateCodeVerifier,
  getAuthUrl,
} = require("../keycloak/client.js");
const store = require("store")

const login = (_req, res, next) => {
  try {
    const code_verifier = generateCodeVerifier();
    const code_challenge = generateCodeChallenge(code_verifier);
    res.cookie("code_verifier", code_verifier, { domain: "webapp.local" ,httpOnly: true});
    store.set("code_verifier", {code_verifier: code_verifier})
    res.redirect(getAuthUrl(code_challenge));
    next();
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = login;
