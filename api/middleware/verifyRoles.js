const { getUserRoles } = require("../../keycloak/client");

const verifyRole = (requiredRole) => {
  return async (req, res, next) => {
    const roles = await getUserRoles(req.cookies.tokenset);

    if (roles.includes(requiredRole)) {
      next();
    } else {
      res.send("No permission");
    }
  };
};

module.exports = verifyRole;
