const {
  getCallbackParams,
  generateTokenset,
} = require("../keycloak/client.js");

const callback = async (req, res, next) => {
  try {
    const params = await getCallbackParams(req);
    const tokenSet = await generateTokenset(
      "http://localhost:3000/login/cb",
      params
    );
    console.log(params, tokenSet);
    res.cookie("tokenset", tokenSet, { httpOnly: true });
    res.send("Successfully authenticated");
    next();
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = callback;
