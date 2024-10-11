"use strict";

var mongoose = require('mongoose');
var productSchema = mongoose.Schema({
  productName: String,
  brandName: String,
  category: String,
  productImage: [],
  description: String,
  price: Number,
  sellingPrice: Number
}, {
  timestamps: true
});
var productModel = mongoose.model("product", productSchema);
module.exports = productModel;