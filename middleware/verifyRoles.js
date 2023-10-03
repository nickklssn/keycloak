const { getUserRoles } = require("../keycloak/client");

//checks if a user has specific roles for accessing data from api
const verifyRole = (requiredRole) => {
  return async (req, res, next) => {
    const roles = await getUserRoles(req.cookies.tokenset);

    if (roles.includes(requiredRole)) {
      next();
    } else {
      res.json("No permission due missing roles");
    }
  };
};

module.exports = verifyRole;