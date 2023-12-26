const cartModel = require("../models/cartModel");
const mongoose = require("mongoose");
const ObjectID = mongoose.Types.ObjectId;

const createInvoiceService = async (req) => {
  //========================Step 01: Calculate Total Payablbe & Vat ========================

  let userId = new ObjectID(req.headers.user_id);
  //   let cusEmail = req.headers.email;
  let matchStage = { $match: { userID: userId } };
  let joinProductStage = {
    $lookup: {
      from: "products",
      localField: "productID",
      foreignField: "_id",
      as: "product",
    },
  };
  let unwindStage = { $unwind: "$product" };

  let cartProducts = await cartModel.aggregate([
    matchStage,
    joinProductStage,
    unwindStage,
  ]);

  let totalAmount = 0;
  cartProducts.forEach((element) => {
    let price;
    if (element["product"]["discount"]) {
      price = parseFloat(element["product"]["discountPrice"]);
    } else {
      price = parseFloat(element["product"]["price"]);
    }
    totalAmount += parseFloat(element["qty"]) * price;
  });

  let vat = totalAmount * 0.05; // 5% VAT
  let Payablbe = totalAmount + vat;
  return { status: "success", data: cartProducts };
};

module.exports = {
  createInvoiceService,
};
