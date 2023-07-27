require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const login = require("./controller/loginController.js");
const callback = require("./controller/callbackController.js");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


app.get("/", (_req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/login", login ,async (req, res) => {


});

app.get("/login/cb", callback ,async (req, res) => {

});

app.get("/test",  async(req, res) =>{
})

app.listen(PORT, () => {
  console.log("Server listen on port 3000");
});
