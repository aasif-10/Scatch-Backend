const userModel = require("../models/user-model");

module.exports.addToCart = async (req, res) => {
  try {
    let user = await userModel.findOne({ email: req.user.email });

    if (user.cart.includes(req.params.id)) {
      req.flash("error", "Item already in cart.");
      res.redirect("/shop");
    }
    user.cart.push(req.params.id);
    await user.save();
    req.flash("success", "Item added to cart.");
    res.redirect("/shop");
  } catch (err) {
    res.send(err.message);
  }
};
