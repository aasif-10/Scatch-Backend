const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.signupUser = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    let userFound = await userModel.findOne({ email: email });

    if (userFound) {
      req.flash("error", "Account already exists!");
      return res.redirect("/");
    }

    bcrypt.genSalt(10, async (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        let createdUser = await userModel.create({
          fullName: name,
          email,
          password: hash,
        });
        let token = jwt.sign(
          { email: email, userid: createdUser._id },
          process.env.JWT_KEY
        );
        res.cookie("token", token);
        return res.send("Account created Succesfully!");
      });
    });
  } catch (err) {
    res.send(err.message);
  }
};
