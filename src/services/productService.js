const brandModel = require("../models/brandModel");

const categoryModel = require("../models/categoryModel");
const sliderModel = require("../models/sliderModel");
const productModel = require("../models/productModel");
const productDetailsModel = require("../models/productDetailsModel");
const reviewModel = require("../models/reviewModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const brandListService = async () => {
  try {
    let data = await brandModel.find();
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error }.toString();
  }
};
const categoryListService = async () => {
  try {
    let data = await categoryModel.find();
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error }.toString();
  }
};
const sliderListService = async () => {
  try {
    let data = await sliderModel.find();
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error }.toString();
  }
};

const listByBrandService = async (req) => {
  try {
    let BrandID = new ObjectId(req.params.brandID);
    let matchStage = { $match: { brandID: BrandID } };
    let joinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let joinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "categorie",
      },
    };
    let unwindBrandStage = { $unwind: "$brand" };
    let unwindCategoryStage = { $unwind: "$categorie" };
    let projectionStage = {
      $project: {
        "brand._id": 0,
        "categorie._id": 0,
        categoryID: 0,
        brandID: 0,
      },
    };

    let data = await productModel.aggregate([
      matchStage,
      joinWithBrandStage,
      joinWithCategoryStage,
      unwindBrandStage,
      unwindCategoryStage,
      projectionStage,
    ]);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error }.toString();
  }
};
const listByCategoryService = async (req) => {
  try {
    let CategoryID = new ObjectId(req.params.categoryID);
    let matchStage = { $match: { categoryID: CategoryID } };
    let joinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let joinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "categorie",
      },
    };
    let unwindBrandStage = { $unwind: "$brand" };
    let unwindCategoryStage = { $unwind: "$categorie" };
    let projectionStage = {
      $project: {
        "brand._id": 0,
        "categorie._id": 0,
        categoryID: 0,
        brandID: 0,
      },
    };

    let data = await productModel.aggregate([
      matchStage,
      joinWithBrandStage,
      joinWithCategoryStage,
      unwindBrandStage,
      unwindCategoryStage,
      projectionStage,
    ]);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error }.toString();
  }
};

const listByRemarkService = async (req) => {
  try {
    let Remark = req.params.remark;
    let matchStage = { $match: { remark: Remark } };
    let joinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let joinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "categorie",
      },
    };
    let unwindBrandStage = { $unwind: "$brand" };
    let unwindCategoryStage = { $unwind: "$categorie" };
    let projectionStage = {
      $project: {
        "brand._id": 0,
        "categorie._id": 0,
        categoryID: 0,
        brandID: 0,
      },
    };

    let data = await productModel.aggregate([
      matchStage,
      joinWithBrandStage,
      joinWithCategoryStage,
      unwindBrandStage,
      unwindCategoryStage,
      projectionStage,
    ]);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error }.toString();
  }
};
const listBySimilarService = async (req) => {
  try {
    let CategoryID = new ObjectId(req.params.categoryID);
    let matchStage = { $match: { categoryID: CategoryID } };
    let limitStage = { $limit: 20 };
    let joinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let joinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "categorie",
      },
    };
    let unwindBrandStage = { $unwind: "$brand" };
    let unwindCategoryStage = { $unwind: "$categorie" };
    let projectionStage = {
      $project: {
        "brand._id": 0,
        "categorie._id": 0,
        categoryID: 0,
        brandID: 0,
      },
    };

    let data = await productModel.aggregate([
      matchStage,
      limitStage,
      joinWithBrandStage,
      joinWithCategoryStage,
      unwindBrandStage,
      unwindCategoryStage,
      projectionStage,
    ]);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error }.toString();
  }
};

const detailsService = async (req) => {
  try {
    let ProductID = new ObjectId(req.params.productID);
    let matchStage = { $match: { _id: ProductID } };
    let joinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let joinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "categorie",
      },
    };
    let joinWithDetailsStage = {
      $lookup: {
        from: "productdetails",
        localField: "_id",
        foreignField: "productID",
        as: "details",
      },
    };

    let unwindBrandStage = { $unwind: "$brand" };
    let unwindCategoryStage = { $unwind: "$categorie" };
    let unwinDetailsStage = { $unwind: "$details" };

    let projectionStage = {
      $project: {
        "brand._id": 0,
        "categorie._id": 0,
        categoryID: 0,
        brandID: 0,
      },
    };

    let data = await productModel.aggregate([
      matchStage,
      joinWithBrandStage,
      joinWithCategoryStage,
      joinWithDetailsStage,
      unwindBrandStage,
      unwindCategoryStage,
      unwinDetailsStage,
      projectionStage,
    ]);
    return { status: "success", data: data };
  } catch (error) {
    console.error("Error in detailsService:", error);
    return { status: "fail", error: error.message };
  }
};

const listByKeywordService = async (req) => {
  try {
    let searchRegex = { $regex: req.params.keyword, $options: "i" };
    let searchParams = [{ title: searchRegex }, { shortDes: searchRegex }];
    let searchQuery = { $or: searchParams };

    let matchStage = { $match: searchQuery };
    let joinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let joinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "categorie",
      },
    };
    let unwindBrandStage = { $unwind: "$brand" };
    let unwindCategoryStage = { $unwind: "$categorie" };

    let projectionStage = {
      $project: {
        "brand._id": 0,
        "categorie._id": 0,
        categoryID: 0,
        brandID: 0,
      },
    };
    let data = await productModel.aggregate([
      matchStage,
      joinWithBrandStage,
      joinWithCategoryStage,

      unwindBrandStage,
      unwindCategoryStage,

      projectionStage,
    ]);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error }.toString();
  }
};

const reviewListService = async (req) => {
  try {
    let ProductID = new ObjectId(req.params.productID);
    let matchStage = { $match: { productID: ProductID } };
    let joinWithProfileStage = {
      $lookup: {
        from: "profiles",
        localField: "userID",
        foreignField: "userID",
        as: "profile",
      },
    };

    let unwindProfileStage = { $unwind: "$profile" };
    let projectionStage = {
      $project: {
        des: 1,
        rating: 1,
        "profile.cus_name": 1,
      },
    };

    let data = await reviewModel.aggregate([
      matchStage,
      joinWithProfileStage,
      unwindProfileStage,
      projectionStage,
    ]);

    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error }.toString();
  }
};

module.exports = {
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
};
