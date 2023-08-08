const {getUserRoles1} = require("../../keycloak/clients/client1/init.js")

const verifyRole = (requiredRole) => {
  return async (req, res, next) => {
    const roles = await getUserRoles1(req.cookies.tokenset);

    if (roles.includes(requiredRole)) {
      next();
    } else {
      res.send("No permission");
    }
  };
};

module.exports = verifyRole;
