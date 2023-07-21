const { isValid, regenerateToken } = require("../../keycloak/client.js");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.tokenset;
    const valid = await isValid(token);
    if (valid) {
      console.log("Ist valide"); // Token ist gültig
      next();
    } else {
      console.log("Ist nicht valide"); //Token ist nicht gültig und wird refresht
      const newToken = await regenerateToken(token.refresh_token);
      res.cookie("tokenset", newToken, { httpOnly: true });
      next();
    }
  } catch (err) {
    console.error(err.message)
    next(err)
  }
};

module.exports = verifyToken;
