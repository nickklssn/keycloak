const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { insertData, queryData } = require("../database/db");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());






app.get("/login", (req, res) => {
    const code_verifier = generators.codeVerifier();
    const code_challenge = generators.codeChallenge(code_verifier)
    const authUrl = client2.authorizationUrl({
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
    const params = client2.callbackParams(req)
    const tokenSet = await client2.callback("http://localhost:4001/login/cb", params, {code_verifier})
    console.log(params, tokenSet)
    await insertData(tokenSet)
    await queryData()
    res.cookie("tokenset", tokenSet.access_token, {httpOnly: true})
    res.clearCookie("code_verifier")
    res.send("Successfully authenticated")
})

app.listen(4001, () => {
  console.log("Server listen on port 4001");
});
