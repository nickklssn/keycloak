const {
  generateCodeChallenge,
  generateCodeVerifier,
  getAuthUrl,
} = require("../keycloak/client.js");

const login = (_req, res, next) => {
  try {
    const code_verifier = generateCodeVerifier();
    const code_challenge = generateCodeChallenge(code_verifier);
    res.cookie("code_verifier", code_verifier, { httpOnly: true });
    res.redirect(getAuthUrl(code_challenge));
    next();
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = login;
