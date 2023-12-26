const wishModel = require("../models/wishModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const wishListService = async (req) => {
  try {
    let user_Id = new ObjectId(req.headers.user_id);
    let matchStage = { $match: { userID: user_Id } };

    let joinProductStage = {
      $lookup: {
        from: "products",
        localField: "productID",
        foreignField: "_id",
        as: "product",
      },
    };
    let unwindProductStage = { $unwind: "$product" };
    let joinBrandStage = {
      $lookup: {
        from: "brands",
        localField: "product.brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let unwindBrandStage = { $unwind: "$brand" };
    let joinCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "product.categoryID",
        foreignField: "_id",
        as: "category",
      },
    };

    let unwindCategoryStage = { $unwind: "$category" };
    let projectionStage = {
      $project: {
        _id: 0,
        userID: 0,
        createAt: 0,
        updateAt: 0,
        "product._id": 0,
        "product.categoryID": 0,
        "product.brandID": 0,
        "brand._id": 0,
        "category._id": 0,
      },
    };

    let data = await wishModel.aggregate([
      matchStage,
      joinProductStage,
      unwindProductStage,
      joinBrandStage,
      unwindBrandStage,
      joinCategoryStage,
      unwindCategoryStage,
      projectionStage,
    ]);
    return { status: "succes", data: data };
  } catch (error) {
    return { status: "fail", message: error };
  }
};
const saveWishListService = async (req) => {
  try {
    let userId = req.headers.user_id;
    let reqBody = req.body;
    reqBody.userID = userId;
    await wishModel.updateOne(reqBody, { $set: reqBody }, { upsert: true });
    return { status: "success", message: "Wish List Saved successfully" };
  } catch (error) {
    return { status: "fail", message: error };
  }
};
const removeWishListService = async (req) => {
  try {
    let userId = req.headers.user_id;
    let reqBody = req.body;
    reqBody.userID = userId;
    await wishModel.deleteOne(reqBody);
    return { status: "success", message: "Wish List Removed successfully" };
  } catch (error) {
    return { status: "fail", message: error };
  }
};

module.exports = {
  wishListService,
  saveWishListService,
  removeWishListService,
};
