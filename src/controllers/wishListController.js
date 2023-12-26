const {
  wishListService,
  saveWishListService,
  removeWishListService,
} = require("../services/wishListService");

exports.wishList = async (req, res) => {
  let result = await wishListService(req);
  return res.status(200).json(result);
};

exports.saveWishList = async (req, res) => {
  let result = await saveWishListService(req);
  return res.status(200).json(result);
};

exports.removeWishList = async (req, res) => {
  let result = await removeWishListService(req);
  return res.status(200).json(result);
};
