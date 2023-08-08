const { Issuer } = require("openid-client");
const { client2Config } = require("./config.js");
const issuerUrl = "http://localhost:8080/realms/myrealm"

var client2 = null;

(async function () {
  const issuer2 = await Issuer.discover(issuerUrl);
  client2 = new issuer2.Client(client2Config);
})();