require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();

const PORT = process.env.API_PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


app.get("/" ,(req, res) => {
  res.send("Welcome to the api");
});

app.get("/user1", (req, res) => {
  res.json({ name: "Nick", age: 23, gender: "m" });
});

app.get("/user2", (req, res) =>{
  res.json({ name: "Karsten", age: 46, gender: "m" })
})

app.get("/user3", (req, res) =>{
  res.json({ name: "Alisa", age: 55, gender: "w" })
})

app.listen(PORT, () => {
  console.log("Server listen on port 3001");
});


