const { createInvoiceService } = require("../services/invoiceService");

exports.createInvoice = async (req, res) => {
  let result = await createInvoiceService(req);

  return res.status(200).json(result);
};
