const { getUserRoles } = require("../keycloak/client");

const verifyRole = (requiredRole) => {
  return async (req, res, next) => {
    console.log("Das ist das Access Token", req.cookies)
    const roles = await getUserRoles(req.cookies.tokenset);

    if (roles.includes(requiredRole)) {
      next();
    } else {
      res.json("No permission");
    }
  };
};

module.exports = verifyRole;