const { isValid, regenerateToken } = require("../../keycloak/client.js");

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.tokenset;
    //console.log("Das ist das Tokenset aus dem Cookie", token)
    if (isValid(token)) {
      console.log("Ist valide"); // Token ist gültig
      next();
    } else {
      console.log("Ist nicht valide"); //Token ist nicht gültig und wird refresht
      const newToken = regenerateToken(token.refresh_token);
      res.cookie("tokenset", newToken, { httpOnly: true });
      next();
    }
  } catch (err) {
    console.error(err.message)
    next(err)
  }
};

module.exports = verifyToken;