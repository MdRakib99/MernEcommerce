const {
  createInvoiceService,
  paymentFailService,
  paymentSuccessService,
  paymentIPNService,

  invoiceListService,
  invoiceProductListService,
} = require("../services/invoiceService");

exports.createInvoice = async (req, res) => {
  let result = await createInvoiceService(req);

  return res.status(200).json(result);
};

exports.paymentSuccess = async (req, res) => {
  let result = await paymentSuccessService(req);
  return res.redirect("/invoice");
};
exports.paymentFail = async (req, res) => {
  let result = await paymentFailService(req);
  return res.redirect("/invoice");
};
exports.paymentCancel = async (req, res) => {
  let result = await paymentSuccessService(req);
  return res.redirect("/invoice");
};
exports.paymentIPN = async (req, res) => {
  let result = await paymentIPNService(req);
  return res.status(200).json(result);
};

exports.invoiceList = async (req, res) => {
  let result = await invoiceListService(req);
  return res.status(200).json(result);
};
exports.invoiceProductList = async (req, res) => {
  let result = await invoiceProductListService(req);
  return res.status(200).json(result);
};
