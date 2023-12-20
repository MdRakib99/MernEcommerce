const express = require("express");
const productController = require("../controllers/productController");
const userController = require("../controllers/userController");
const authVerification = require("../middleware/authVerification");

const router = express.Router();

//product

router.get("/productBrandList", productController.productBrandList);
router.get("/productCategoryList", productController.productCategoryList);
router.get("/productSliderList", productController.productSliderList);
router.get(
  "/productListByBrand/:brandID",
  productController.productListByBrand
);
router.get(
  "/productListByCategory/:categoryID",
  productController.productListByCategory
);
router.get(
  "/productListBySimilar/:keyword",
  productController.productListBySimilar
);
router.get(
  "/productListBykeyword/:keyword",
  productController.productListBykeyword
);
router.get(
  "/productListByRemark/:remark",
  productController.productListByRemark
);
router.get("/productDetails/:productID", productController.productDetails);
router.get(
  "/productReviewList/:productID",
  productController.productReviewList
);

module.exports = router;

//User
router.get("/userOTP/:email", userController.userOTP);
router.get("/verifyLogin/:email/:otp", userController.verifyLogin);
router.get("/userLogout", authVerification, userController.userLogout);
router.post("/createProfile", authVerification, userController.createProfile);
