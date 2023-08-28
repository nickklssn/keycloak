require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors")
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
app.use(cors({
  origin: "webapp.local:3000"
}))



app.get("/", (_req, res) => {
  res.sendFile(__dirname + "/views/login.html");
});

app.get("/login", login ,async (req, res) => {

});

app.get("/login/cb", callback ,async (req, res) => {
  res.sendFile(__dirname + "/views/dashboard.html");
});

app.get("/getData", /*verifyToken, verifyRole("app-user"),*/ (req, res) => {
  
  res.json({text: "Hello from the other side"})

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
  console.log("Server listen on port 3000");
});
