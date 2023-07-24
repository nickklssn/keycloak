const {
  getAuthUrl,
} = require("../keycloak/client.js");

const login = async (_req, res, next) => {
  try {
    res.redirect(getAuthUrl());
    next();
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = login;
