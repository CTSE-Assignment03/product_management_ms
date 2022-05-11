const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  publishingTitle: {
    type: String,
    required: true,
  },
  originalTitle: {
    type: String,
    required: true,
  },
  translator: {
    type: String,
    required: false,
  },
  originalAuthor: {
    type: String,
    required: true,
  },
  ISBN: {
    type: String,
    required: true,
    unique: true,
  },
  marketPrice: {
    type: Number,
    required: true,
  },
  discountPercentage: {
    regular: { type: Number, default: 0 },
    bulk: { type: Number, default: 0 },
    label: { type: String },
  },
  addDate: {
    type: Date,
    default: Date(),
  },
});

const Product = mongoose.model("product", ProductSchema);

module.exports = Product;
