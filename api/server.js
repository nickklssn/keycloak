require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const verifyToken = require("./middleware/verifyToken");
const verifyRole = require("./middleware/verifyRoles");
const cors = require("cors")

const app = express();

const PORT = process.env.API_PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(verifyToken)

app.use(cors({
  origin: "http://webapp.local:3000",
  credentials: true, 
}));

app.get("/", verifyRole("app-user") ,(req, res) => {
  res.send("Welcome to the api");
});

app.get("/data", (req, res) => {
  res.json({ name: "Nick", age: 23, gender: "m" });
});

app.get("/dummyData", (req, res) =>{
  res.json({ name: "Karsten", age: 46, gender: "m" })
})

app.listen(PORT, () => {
  console.log("Server listen on port 3001");
});


