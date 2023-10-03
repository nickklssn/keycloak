require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const login = require("./controller/loginController.js");
const callback = require("./controller/callbackController.js");
const verifyToken = require("./middleware/verifyToken.js");
const verifyRole = require("./middleware/verifyRoles.js");
const logout = require("./controller/logoutController.js");
const { queryAllToken } = require("./database/db.js");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


app.get("/", (_req, res) => {
  res.sendFile(__dirname + "/views/login.html");
});

//auth endpoint
app.get("/login", login ,async (_req, _res) => {

});

//auth callback
app.get("/login/cb", callback ,async (_req, res) => {
  res.sendFile(__dirname + "/views/dashboard.html");
});

//define routes for data fetching from api
app.get("/user1", verifyToken, async (_req, res) => {
  const data = await fetch("http://api.local:3001/user1")
  const formattedData = await data.json();
  res.send(formattedData)
});

app.get("/user2", verifyToken, verifyRole("app-user"), async (_req, res) => {
  const data = await fetch("http://api.local:3001/user2")
  const formattedData = await data.json();
  res.send(formattedData)
});

app.get("/user3", verifyToken, verifyRole("app-admin"), async (_req, res) => {
  const data = await fetch("http://api.local:3001/user3")
  const formattedData = await data.json();
  res.send(formattedData)
});

//end session endpoint
app.get("/logout", logout,(_req, _res) =>{
})

//show all tokens inside db
app.get("/showAllToken", async(_req, res) =>{
  const results = await queryAllToken()
  res.send(results)
})


app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
});
