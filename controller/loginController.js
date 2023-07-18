const {
  getAuthUrl,
} = require("../keycloak/client.js");

const login = async (_req, res, next) => {
  try {
    res.redirect(await getAuthUrl());
    next();
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = login;
