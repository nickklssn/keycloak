require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();

const PORT = process.env.API_PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


app.get("/" ,(_req, res) => {
  res.send("Welcome to the api");
});

//define routes for user data
app.get("/user1", (_req, res) => {
  res.json({ name: "Nick", age: 23, gender: "m" });
});

app.get("/user2", (_req, res) =>{
  res.json({ name: "Karsten", age: 46, gender: "m" })
})

app.get("/user3", (_req, res) =>{
  res.json({ name: "Alisa", age: 55, gender: "w" })
})

app.listen(PORT, () => {
  console.log(`API listen on port ${PORT}`);
});


