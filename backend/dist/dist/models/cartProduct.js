"use strict";

var mongoose = require('mongoose');
var addToCart = mongoose.Schema({
  userId: String,
  productId: {
    ref: 'product',
    type: String
  },
  quantity: Number
}, {
  timestamps: true
});
var addToCartModel = mongoose.model("addToCart", addToCart);
module.exports = addToCartModel;