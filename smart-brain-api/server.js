const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex")({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "password",
    database: "smart-brain"
  }
});
const register = require("./controllers/register");
const signIn = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const PORT = process.env.PORT;

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("it works!!!");
});

app.post("/signin", (req, res) => {
  signIn.handleSignIn(req, res, bcrypt, knex);
});

app.post("/register", (req, res) =>
  register.handleRegister(req, res, bcrypt, knex)
);

app.get("/profile/:id", (req, res) => {
  profile.handleProfile(req, res, knex);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, knex);
});

app.post("/imageurl", (req, res) => {
  image.detectFace(req, res);
});

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
