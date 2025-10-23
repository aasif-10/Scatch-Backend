const express = require("express");
const router = express.Router();

const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  res.render("signup");
});

router.post("/signup", async (req, res) => {
  let { name, email, password } = req.body;

  let userFound = await userModel.findOne({ email: email });
  if (!userFound) {
    let createdUser;
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        createdUser = await userModel.create({
          fullName: name,
          email,
          password: hash,
        });
      });
      let token = jwt.sign({ email: email, userid: createdUser._id }, "secret");
      cookie("token", token);
    });
    return res.send("Account has been created successfully!");
  }
  return res.send("User already exists, please sign in");
});

router.get("/signin", (req, res) => {
  res.render("signin");
});

router.post("/signin", async (req, res) => {
  let { email, password } = req.body;
  let userFound = await userModel.findOne({ email });
  if (!userFound) {
    return res.send("Account does'nt exist. Please sign up");
  }
  bcrypt.compare(password, userFound.password, function (err, result) {
    if (!result) {
      return res.send("Incorrect Password");
    }
    let token = jwt.sign({ email, userid: userFound._id }, "secret");
    res.cookie("token", token);
    res.send("You can login");
  });
});

module.exports = router;
