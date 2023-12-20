const {
  brandListService,
  categoryListService,
  sliderListService,
  listByCategoryService,
  listByBrandService,
  listByRemarkService,
  listBySimilarService,
  listByKeywordService,
  detailsService,
  reviewListService,
} = require("../services/productService");

exports.productBrandList = async (req, res) => {
  let result = await brandListService();
  return res.status(200).json(result);
};

exports.productCategoryList = async (req, res) => {
  let result = await categoryListService(req);
  return res.status(200).json(result);
};
exports.productSliderList = async (req, res) => {
  let result = await sliderListService();
  return res.status(200).json(result);
};
exports.productListByBrand = async (req, res) => {
  let result = await listByBrandService(req);
  return res.status(200).json(result);
};
exports.productListByCategory = async (req, res) => {
  let result = await listByCategoryService(req);
  return res.status(200).json(result);
};
exports.productListByRemark = async (req, res) => {
  let result = await listByRemarkService(req);
  return res.status(200).json(result);
};
exports.productListBySimilar = async (req, res) => {
  let result = await listBySimilarService(req);
  return res.status(200).json(result);
};
exports.productListBykeyword = async (req, res) => {
  let result = await listByKeywordService(req);
  return res.status(200).json(result);
};

exports.productDetails = async (req, res) => {
  let result = await detailsService(req);
  return res.status(200).json(result);
};
exports.productReviewList = async (req, res) => {
  let result = await reviewListService(req);
  return res.status(200).json(result);
};
