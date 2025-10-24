const express = require("express");
const router = express.Router();

const ownerModel = require("../models/owner-model");

if (process.env.NODE_ENV === "development") {
  router.post("/create", async function (req, res) {
    let owners = await ownerModel.find();
    if (owners.length > 0) {
      return res.send("You are not allowed to create");
    }

    let { fullName, email, password } = req.body;
    let createdOwner = await ownerModel.create({
      fullName,
      email,
      password,
    });

    res.send(createdOwner);
  });
}

router.get("/", function (req, res) {
  res.send("its working!");
});

router.get("/admin", (req, res) => {
  res.render("createProducts");
});

router.post("/admin/create", (req, res) => {
  res.send("received");
});

module.exports = router;
