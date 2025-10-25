const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const router = express.Router();

const productModel = require("../models/product-model");
const { addToCart } = require("../controllers/addToCartController");
const userModel = require("../models/user-model");

router.get("/", (req, res) => {
  let error = req.flash("error");
  res.render("index", { error });
});

router.get("/shop", isLoggedIn, async (req, res) => {
  let success = req.flash("success");
  let error = req.flash("error");
  let products = await productModel.find();
  res.render("shop", { products, success, error });
});

router.get("/cart/:id", isLoggedIn, addToCart);

router.get("/cart", isLoggedIn, async (req, res) => {
  let user = await userModel
    .findOne({ email: req.user.email })
    .populate("cart");

  res.render("cart", { user });
});

module.exports = router;
