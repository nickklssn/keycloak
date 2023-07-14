require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const {
  getAuthUrl,
  getCallbackParams,
  generateTokenset,
  generateCodeVerifier
} = require("./keycloak/client.js");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


app.get("/", (_req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/login", async (req, res) => {
  res.redirect(await getAuthUrl())

});

app.get("/login/cb", async (req, res) => {
  const params = await getCallbackParams(req)
  const code_verifier = generateCodeVerifier()
  const tokenSet = await generateTokenset("http://localhost:3000/login/cb", params)
  console.log(tokenSet)
  res.send("Successfully authenticated!")
});

app.listen(PORT, () => {
  console.log("Server listen on port 3000");
});
