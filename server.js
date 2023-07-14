require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const {
  getAuthUrl,
  getCallbackParams,
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
  console.log(await getCallbackParams(req))
  res.send("Successfully authenticated!")
});

app.listen(PORT, () => {
  console.log("Server listen on port 3000");
});
