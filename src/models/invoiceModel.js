const mongoose = require("mongoose");

const dataSchema = mongoose.Schema(
  {
    productID: { type: mongoose.Schema.Types.ObjectId, required: ture },
    userID: { type: mongoose.Schema.Types.ObjectId, required: ture },
    payable: { type: String, required: true },
    cus_details: { type: String, required: true },
    ship_details: { type: String, required: true },
    tran_id: { type: String, required: true },
    val_id: { type: String, required: true },
    delevery_status: { type: String, required: true },
    payment_status: { type: String, required: true },
    total: { type: String, required: true },
    vat: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const invoiceModel = mongoose.model("invoices", dataSchema);

module.exports = invoiceModel;
