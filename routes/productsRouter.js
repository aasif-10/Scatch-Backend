const express = require("express");
const router = express.Router();

const upload = require("../config/multer-config");
const { createProducts } = require("../controllers/createProductsController");

router.get("/", function (req, res) {
  res.send("its working!");
});

router.post("/create", upload.single("image"), createProducts);

module.exports = router;
