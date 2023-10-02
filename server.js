require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const login = require("./controller/loginController.js");
const callback = require("./controller/callbackController.js");
const verifyToken = require("./middleware/verifyToken.js");
const verifyRole = require("./middleware/verifyRoles.js");
const logout = require("./controller/logoutController.js");
const { deleteData, queryData } = require("./database/db.js");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


app.get("/", (_req, res) => {
  res.sendFile(__dirname + "/views/login.html");
});

app.get("/login", login ,async (req, res) => {

});

app.get("/login/cb", callback ,async (req, res) => {
  res.sendFile(__dirname + "/views/dashboard.html");
});

app.get("/user1", verifyToken, async (req, res) => {
  const data = await fetch("http://api.local:3001/user1")
  const formattedData = await data.json();
  res.send(formattedData)
});

app.get("/user2", verifyToken, verifyRole("app-user"), async (req, res) => {
  const data = await fetch("http://api.local:3001/user2")
  const formattedData = await data.json();
  res.send(formattedData)
});

app.get("/user3", verifyToken, verifyRole("app-admin"), async (req, res) => {
  const data = await fetch("http://api.local:3001/user3")
  const formattedData = await data.json();
  res.send(formattedData)
});

app.get("/logout", logout,(req, res) =>{
})

app.get("/deleteData", async(req, res) =>{
  await deleteData()
})

app.get("/showData", async(req, res) =>{
  const results = await queryData()
  res.send(results)
})


app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
});
