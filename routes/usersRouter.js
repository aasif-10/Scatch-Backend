const express = require("express");
const router = express.Router();

const { signupUser } = require("../controllers/signupController");
const { signinUser } = require("../controllers/signinController");

router.get("/", function (req, res) {
  res.send("its working!");
});

router.post("/signup", signupUser);

router.get("/signin", (req, res) => {
  res.render("signin");
});

router.post("/signin", signinUser);

module.exports = router;
