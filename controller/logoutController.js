const { deleteToken } = require("../database/db");
const { getLogoutUrl, revokeToken } = require("../keycloak/client");


const logout = async (req, res, next) => {
    try {
      const token = req.cookies.tokenset
      res.clearCookie('tokenset');
      res.redirect(getLogoutUrl())
      await deleteToken(token)
      await revokeToken(token)
      next()
    } catch (err) {
      console.error(err.message);
    }
  };
  
  module.exports = logout;