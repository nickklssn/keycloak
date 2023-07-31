const { regenerateToken, isActive,  } = require("../../keycloak/client.js");
const {getRefreshtoken, updateToken} = require("../../database/db.js")

const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.tokenset; //Das ist nur access token
    //console.log("Das ist das Tokenset aus dem Cookie", token)
    if (await isActive(token) == true) {
      console.log(await isActive(token))
      console.log("Ist valide"); // Token ist gültig
      next()
    } 
    else {
      console.log("Ist nicht valide"); //Token ist nicht gültig und wird refresht
      const refreshToken = await getRefreshtoken(token) //nur refresh token aus db
      const newTokenset = await regenerateToken(refreshToken); //nur access token
      const newAccessToken = newTokenset.access_token
      const newRefreshToken = newTokenset.refresh_token
      console.log(newAccessToken, newRefreshToken)
      await updateToken(token, newAccessToken, newRefreshToken)
      res.cookie("tokenset", newAccessToken, { httpOnly: true });
      console.log("Updated token!")
      next();
    }
  } catch (err) {
    console.error(err.message)
    next(err)
  }
};

// Wenn der Refresh Token inaktiv ist, dann am besten ein redirect zur kc anmeldeseite
module.exports = verifyToken;