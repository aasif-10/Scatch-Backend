const express = require("express");
const router = express.Router();

const upload = require("../config/multer-config");
const productModel = require("../models/product-model");
const c = require("config");

router.get("/", function (req, res) {
  res.send("its working!");
});

router.post("/create", upload.single("image"), async (req, res) => {
  try {
    let {
      productName,
      productPrice,
      discountPrice,
      backgroundColor,
      panelColor,
      textColor,
    } = req.body;

    let createdProduct = await productModel.create({
      image: req.file.buffer,
      name: productName,
      price: productPrice,
      discount: discountPrice,
      bgColor: backgroundColor,
      panelColor: panelColor,
      textColor: textColor,
    });

    req.flash("success", "Product created succefully!");
    res.redirect("/owners/admin");
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
