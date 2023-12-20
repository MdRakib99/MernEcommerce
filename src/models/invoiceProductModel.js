const mongoose = require("mongoose");

const dataSchema = mongoose.Schema(
  {
    productID: { type: mongoose.Schema.Types.ObjectId, required: ture },
    userID: { type: mongoose.Schema.Types.ObjectId, required: ture },
    invoiceID: { type: mongoose.Schema.Types.ObjectId, required: ture },
    qty: { type: String, required: true },
    price: { type: String, required: true },
    color: { type: String, required: true },
    size: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const invoiceProductModel = mongoose.model("invoiceproducts", dataSchema);

module.exports = invoiceProductModel;
