const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const productSchema = new Schema(
  {
    name: {
      type: String,
    },
    price:{
      type:Number,
    },
    id:{
      type:Number,
    }
  }
);

const Product = model("Product", productSchema);

module.exports = Product;