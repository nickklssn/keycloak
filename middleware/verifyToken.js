const { regenerateToken, isActive  } = require("../keycloak/client.js");
const {getRefreshtoken, updateToken} = require("../database/db.js")

const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.tokenset
    	
    //check if token is still valid
    if (await isActive(token) == true) {
      console.log("Token is valid");
      next()
    } 
    else {
      //if token is not valid, a new token set is generated and updated in db and in browser cookie
      console.log("Token is not valid");
      const refreshToken = await getRefreshtoken(token)
      const newTokenset = await regenerateToken(refreshToken);
      const newAccessToken = newTokenset.access_token
      const newRefreshToken = newTokenset.refresh_token
      await updateToken(token, newAccessToken, newRefreshToken)
      res.cookie("tokenset", newAccessToken, {httpOnly: true, overwrite: true });
      req.cookies.tokenset = newAccessToken;
      console.log("Updated token!")
      next();
    }
  } catch (err) {
    console.error(err.message)
    next(err)
  }
};

module.exports = verifyToken;