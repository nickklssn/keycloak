const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { insertData, queryData } = require("../database/db");
const { getAuthUrl1, getCallbackParams1, generateTokenset1 } = require("../keycloak/clients/client1/init");
const {generateCodeChallenge, generateCodeVerifier} = require("../keycloak/clients/helper/pkce.js")


const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/login", (req, res) => {
  const code_verifier = generateCodeVerifier();
  const code_challenge = generateCodeChallenge(code_verifier);
  res.cookie("code_verifier", code_verifier, { httpOnly: true });
  res.redirect(getAuthUrl1(code_challenge));
});

app.get("/login/cb", async (req, res) => {
  const code_verifier = req.cookies.code_verifier;
  console.log(code_verifier);
  const params = getCallbackParams1(req)
  const tokenSet = await generateTokenset1("http://localhost:4000/login/cb", params, {code_verifier})
  console.log(params, tokenSet);
  await insertData(tokenSet);
  await queryData();
  res.cookie("tokenset", tokenSet.access_token, { httpOnly: true });
  res.clearCookie("code_verifier");
  res.redirect("http://localhost:3001");
});

app.get("/test", (req, res) => {
  
});

app.listen(4000, () => {
  console.log("Server listen on port 4000");
});
