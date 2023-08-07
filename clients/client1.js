const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { Issuer, generators } = require("openid-client");
const { insertData, queryData } = require("../database/db");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());



var client = null;

(async function () {
  const keycloakIssuer = await Issuer.discover(
    "http://localhost:8080/realms/myrealm"
  );

  client = new keycloakIssuer.Client({
    client_id: "myclient",
    client_secret: "xD0VuRQnZnGu0eDyGXEjn8yx52IbdO0A",
    redirect_uris: ["http://localhost:4000/login/cb"],
    response_types: ["code"],
    id_token_signing_alg_values_supported: "RS256",
  });
})();


app.get("/login", (req, res) => {
    const code_verifier = generators.codeVerifier();
    const code_challenge = generators.codeChallenge(code_verifier)
    const authUrl = client.authorizationUrl({
        scope: "openid email profile",
        code_challenge,
        code_challenge_method: "S256",
      });
    console.log(authUrl)
    res.cookie("code_verifier", code_verifier, { httpOnly: true });
    res.redirect(authUrl)
  
});

app.get("/login/cb", async (req, res) =>{
    const code_verifier = req.cookies.code_verifier
    console.log(code_verifier)
    const params = client.callbackParams(req)
    const tokenSet = await client.callback("http://localhost:4000/login/cb", params, {code_verifier})
    console.log(params, tokenSet)
    await insertData(tokenSet)
    await queryData()
    res.cookie("tokenset", tokenSet.access_token, {httpOnly: true})
    res.clearCookie("code_verifier")
    res.redirect("http://localhost:3001")
})




app.listen(4000, () => {
  console.log("Server listen on port 4000");
});
