const { deleteToken } = require("../database/db");
const { getLogoutUrl, revokeToken } = require("../keycloak/client");


const logout = async (req, res, next) => {
    try {
      const token = req.cookies.tokenset
      res.clearCookie('tokenset');
      res.redirect(getLogoutUrl()) //redirect to end session endpoint in keycloak
      //annul access token and delete from db
      await deleteToken(token)
      await revokeToken(token)
      next()
    } catch (err) {
      console.error(err.message);
    }
  };
  
  module.exports = logout;