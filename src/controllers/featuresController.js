const {
  featureListService,
  legalDetailsService,
} = require("../services/featuresService");

exports.featureList = async (req, res) => {
  let result = await featureListService(req);
  return res.status(200).json(result);
};

exports.legalDetails = async (req, res) => {
  let result = await legalDetailsService(req);
  return res.status(200).json(result);
};
