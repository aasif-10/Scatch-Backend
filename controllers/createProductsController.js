const productModel = require("../models/product-model");

module.exports.createProducts = async (req, res) => {
  try {
    let {
      productName,
      productPrice,
      productDiscount,
      backgroundColor,
      panelColor,
      textColor,
    } = req.body;

    let createdProduct = await productModel.create({
      image: req.file.buffer,
      name: productName,
      price: productPrice,
      discount: productDiscount,
      bgColor: backgroundColor,
      panelColor: panelColor,
      textColor: textColor,
    });

    req.flash("success", "Product created succefully!");
    res.redirect("/owners/admin");
  } catch (err) {
    console.log(err.message);
  }
};
