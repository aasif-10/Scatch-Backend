const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.signinUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    let userFound = await userModel.findOne({ email });
    if (!userFound) {
      req.flash("error", "Account does'nt exist. Please sign up");
      return res.redirect("/");
    }
    bcrypt.compare(password, userFound.password, function (err, result) {
      if (!result) {
        req.flash("error", "Incorrect Password");
        return res.redirect("/users/signin");
      }
      let token = jwt.sign(
        { email, userid: userFound._id },
        process.env.JWT_KEY
      );
      res.cookie("token", token);
      res.redirect("/shop");
    });
  } catch (err) {
    res.send(err.message);
  }
};
