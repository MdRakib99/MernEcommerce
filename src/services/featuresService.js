const featuresModel = require("../models/featuresModel");
const legalModel = require("../models/legalModel");

const featureListService = async () => {
  try {
    let result = await featuresModel.find();
    return { status: "success", data: result };
  } catch (error) {
    return { status: "success", data: error };
  }
};

const legalDetailsService = async (req) => {
  try {
    let type = req.params.type;
    let result = await legalModel.find({ type: type });
    return { status: "success", data: result };
  } catch (error) {
    return { status: "success", data: error };
  }
};
module.exports = {
  featureListService,
  legalDetailsService,
};
