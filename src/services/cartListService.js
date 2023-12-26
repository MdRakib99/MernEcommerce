const cartModel = require("../models/cartModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const cartListService = async (req) => {
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

    let data = await cartModel.aggregate([
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

const saveCartListService = async (req) => {
  try {
    let userId = req.headers.user_id;
    let reqBody = req.body;
    reqBody.userID = userId;
    await cartModel.create(reqBody);
    return { status: "success", message: "Wish List Saved successfully" };
  } catch (error) {
    return { status: "fail", message: error };
  }
};
const updateCartListService = async (req) => {
  try {
    let userId = req.headers.user_id;
    let cartID = req.params.cartID;
    let reqBody = req.body;
    reqBody.userID = userId;
    await cartModel.updateOne(
      { _id: cartID, userID: userId },
      { $set: reqBody }
    );
    return { status: "success", message: "Wish List Saved successfully" };
  } catch (error) {
    return { status: "fail", message: error };
  }
};

const removeCartListService = async (req) => {
  try {
    let userId = req.headers.user_id;
    let reqBody = req.body;
    reqBody.userID = userId;
    await cartModel.deleteOne(reqBody);
    return { status: "success", message: "Cart List Removed successfully" };
  } catch (error) {
    return { status: "fail", message: error };
  }
};
module.exports = {
  saveCartListService,
  removeCartListService,
  cartListService,
  updateCartListService,
};
