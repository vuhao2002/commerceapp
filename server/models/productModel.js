const mongoose = require("mongoose"); // Erase if already require

// Declare the Schema of the Mongo model
var productModel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
    },
    color: {
      type: String,
      required: true,
    },
    ratings: [
      {
        star: Number,
        comment: String,
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
    totalRating: {
      type: String,
      default: 0,
    },
  },
  { timestamps: true }
);

//Add plugins
// mongoose.plugin(slug);

//Export the model
module.exports = mongoose.model("Product", productModel);
