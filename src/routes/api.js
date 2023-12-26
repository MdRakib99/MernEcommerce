const express = require("express");
const productController = require("../controllers/productController");
const userController = require("../controllers/userController");
const authVerification = require("../middleware/authVerification");

const {
  saveWishList,
  removeWishList,
  wishList,
} = require("../controllers/wishListController");

const {
  saveCartList,
  removeCartList,
  cartList,
  updateCartList,
} = require("../controllers/cartListController");

const { createInvoice } = require("../controllers/invoiceController");

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

//User

router.get("/userOTP/:email", userController.userOTP);
router.get("/verifyLogin/:email/:otp", userController.verifyLogin);
router.get("/userLogout", authVerification, userController.userLogout);
router.post("/createProfile", authVerification, userController.saveProfile);
router.post("/updateProfile", authVerification, userController.saveProfile);
router.get("/readProfile", authVerification, userController.readProfile);

//Wish

router.post("/saveWishList", authVerification, saveWishList);
router.post("/removeWishList", authVerification, removeWishList);
router.get("/wishList", authVerification, wishList);

//Cart

router.post("/saveCartList", authVerification, saveCartList);
router.post("/removeCartList", authVerification, removeCartList);
router.post("/updateCartList/:cartID", authVerification, updateCartList);
router.get("/cartList", authVerification, cartList);

//Invoice & Payment

router.get("/createInvoice", authVerification, createInvoice);

module.exports = router;
