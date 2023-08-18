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
  res.sendFile(__dirname + "/views/login.html");
});

app.get("/login", login ,async (req, res) => {


});

app.get("/login/cb", callback ,async (req, res) => {
  res.sendFile(__dirname + "/views/dashboard.html");
});

app.get("/getData", async (req, res) => {
  try {
    const access_token = req.cookies.tokenset
    const response = await fetch("http://api.local:3001/dummyData", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Fehler beim Abrufen der Daten:", error);
    res.status(500).json({ error: "Fehler beim Abrufen der Daten." });
  }
});

app.get("/test",  async(req, res) =>{
  res.sendFile(__dirname + "/views/dashboard.html");
})

app.listen(PORT, () => {
  console.log("Server listen on port 3000");
});
