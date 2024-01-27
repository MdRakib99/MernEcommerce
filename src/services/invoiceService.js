const cartModel = require("../models/cartModel");
const mongoose = require("mongoose");
const profileModel = require("../models/profileModel");
const invoiceModel = require("../models/invoiceModel");
const invoiceProductModel = require("../models/invoiceProductModel");
const paymentSettingModel = require("../models/paymentSettingModel");
const formData = require("form-data");
const ObjectID = mongoose.Types.ObjectId;
const axios = require("axios");

const createInvoiceService = async (req) => {
  //========================Step 01: Calculate Total Payablbe & Vat ========================

  let userId = new ObjectID(req.headers.user_id);
  let cusEmail = req.headers.email;
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
  let payable = totalAmount + vat;

  //========================Step 02: Prepare Customer Details & Shipping Details ========================

  let profile = await profileModel.aggregate([{ $match: { userID: userId } }]);

  const cusDetails = `Name:${profile["cus_name"]}, Email:${cusEmail}, Address:${profile["cus_add"]}, Phone:${profile["cus_phone"]}`;
  const shipDetails = `Name:${profile["ship_name"]}, City:${profile["ship"]}, Address:${profile["ship_add"]}, Phone:${profile["ship_phone"]}`;

  //========================Step 03: Transaction & Other's ID ========================

  let tranID = Math.floor(10000000 + Math.random() * 90000000);
  let valID = 0;
  let deliveryStatus = "pending";
  let paymentStatus = "pending";

  //========================Step 04: Create Invoice ========================

  let createInvoice = await invoiceModel.create({
    userID: userId,
    payable: payable,
    cus_details: cusDetails,
    ship_details: shipDetails,
    tran_id: tranID,
    val_id: valID,
    delevery_status: deliveryStatus,
    payment_status: paymentStatus,
    total: totalAmount,
    vat: vat,
  });

  //========================Step 05: Create Invoice Product========================
  let invoiceId = createInvoice["_id"];

  cartProducts.forEach(async (element) => {
    await invoiceProductModel.create({
      userID: userId,
      productID: element["productID"],
      invoiceID: invoiceId,
      qty: element["qty"],
      price: element["product"]["discountPrice"]
        ? element["product"]["discountPrice"]
        : element["product"]["price"],
      color: element["color"],
      size: element["size"],
    });
  });
  //========================Step 06: Remove Cart========================

  await cartModel.deleteMany({ userID: userId });

  //========================Step 07: Prepare SSL Payment========================

  let paymentSettings = await paymentSettingModel.find();
  // console.log(paymentSettings);
  // console.log(profile);
  const form = new formData();
  form.append("store_id", paymentSettings[0]["store_id"]);
  form.append("store_passwd", paymentSettings[0]["store_passwd"]);
  form.append("total_amount", payable.toString());
  form.append("currency", paymentSettings[0]["currency"]);
  form.append("tran_id", tranID);
  form.append("success_url", `${paymentSettings[0]["success_url"]}/${tranID}`);

  form.append("fail_url", `${paymentSettings[0]["fail_url"]}/${tranID}`);
  form.append("cancel_url", `${paymentSettings[0]["cancel_url"]}/${tranID}`);
  form.append("ipn_url", `${paymentSettings[0]["ipn_url"]}/${tranID}`);

  form.append("cus_name", profile[0]["cus_name"]);
  form.append("cus_email", cusEmail);
  form.append("cus_add1", profile[0]["cus_add"]);
  form.append("cus_add2", profile[0]["cus_add"]);
  form.append("cus_city", profile[0]["cus_city"]);
  form.append("cus_state", profile[0]["cus_state"]);
  form.append("cus_postcode", profile[0]["cus_postcode"]);
  form.append("cus_country", profile[0]["cus_country"]);
  form.append("cus_phone", profile[0]["cus_phone"]);
  form.append("cus_fax", profile[0]["cus_fax"]);

  form.append("shipping_method", "YES");

  form.append("ship_name", profile[0]["ship_name"]);
  form.append("ship_add1", profile[0]["ship_add"]);
  form.append("ship_add2", profile[0]["ship_add"]);
  form.append("ship_city", profile[0]["ship_city"]);
  form.append("ship_state", profile[0]["ship_state"]);
  form.append("ship_country", profile[0]["ship_country"]);
  form.append("ship_postcode", profile[0]["ship_postcode"]);
  form.append("product_name", "MERN Shop Products");
  form.append("product_category", "According Invoice");
  form.append("product_profile", "According Invoice");
  form.append("product_amount", "According Invoice");

  let SSLRes = await axios.post(paymentSettings[0]["init_url"], form);

  return { status: "success", data: SSLRes.data };
};

const paymentSuccessService = async (req) => {
  try {
    let trxID = req.params.trxID;
    await invoiceModel.updateOne(
      { tran_id: trxID },
      { payment_status: "success" }
    );
    return { status: "success" };
  } catch (error) {
    return { status: "fail", message: "Something went wrong" };
  }
};
const paymentFailService = async (req) => {
  try {
    let trxID = req.params.trxID;
    await invoiceModel.updateOne(
      { tran_id: trxID },
      { payment_status: "fail" }
    );
    return { status: "fail" };
  } catch (error) {
    return { status: "fail", message: "Something went wrong" };
  }
};
const paymentCancelService = async (req) => {
  try {
    let trxID = req.params.trxID;
    await invoiceModel.updateOne(
      { tran_id: trxID },
      { payment_status: "cancel" }
    );
    return { status: "cancel" };
  } catch (error) {
    return { status: "fail", message: "Something went wrong" };
  }
};

const paymentIPNService = async (req) => {
  try {
    let trxID = req.params.trxID;
    let status = req.body["status"];
    await invoiceModel.updateOne(
      { tran_id: trxID },
      { payment_status: status }
    );
    return { status: success };
  } catch (error) {
    return { status: "fail", message: "Something went wrong" };
  }
};

const invoiceListService = async (req) => {
  try {
    let userId = req.headers.user_id;
    let invoice = await invoiceModel.find({ userID: userId });
    return { status: "success", data: invoice };
  } catch (error) {
    return { status: "fail", message: "Something went wrong" };
  }
};

const invoiceProductListService = async (req) => {
  try {
    let userId = new ObjectID(req.headers.user_id);
    let invoiceId = new ObjectID(req.params.invoice_id);

    let matchStage = {
      $match: { userID: userId, invoiceID: invoiceId },
    };

    let joinProductStage = {
      $lookup: {
        from: "products",
        localField: "productID",
        foreignField: "_id",
        as: "product",
      },
    };
    let joinInvoiceStage = {
      $lookup: {
        from: "invoices",
        localField: "invoiceID",
        foreignField: "_id",
        as: "invoice",
      },
    };

    let unwindProductStage = { $unwind: "$product" };
    let unwindInvoiceStage = { $unwind: "$invoice" };
    let result = await invoiceProductModel.aggregate([
      matchStage,
      joinProductStage,
      joinInvoiceStage,
      unwindInvoiceStage,
      unwindProductStage,
    ]);
    return { status: "success", data: result };
  } catch (error) {
    return { status: "fail", message: "Something went wrong" };
  }
};

module.exports = {
  createInvoiceService,
  paymentSuccessService,
  paymentFailService,
  paymentCancelService,
  paymentIPNService,
  invoiceListService,
  invoiceProductListService,
};
