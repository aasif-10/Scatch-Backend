const express = require("express");
const router = express.Router();

const { signupUser } = require("../controllers/signupController");
const { signinUser } = require("../controllers/signinController");

router.get("/", function (req, res) {
  res.send("its working!");
});

router.post("/signup", signupUser);

router.get("/signin", (req, res) => {
  let error = req.flash("error");
  res.render("signin", { error });
});

router.post("/signin", signinUser);

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.send("Logged out");
});

module.exports = router;
