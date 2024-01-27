const express = require("express");
const router = express.Router();

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

const {
  createInvoice,
  paymentSuccess,
  paymentFail,
  paymentCancel,
  paymentIPN,
  invoiceList,
  invoiceProductList,
} = require("../controllers/invoiceController");
const {
  featureList,
  legalDetails,
} = require("../controllers/featuresController");

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

router.post("/productListByFilter", productController.productListByFilter);

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

//Invoice

router.get("/createInvoice", authVerification, createInvoice);
router.get("/invoiceList", authVerification, invoiceList);
router.get(
  "/invoiceProductList/:invoice_id",
  authVerification,
  invoiceProductList
);

//  Payment

router.post("/paymentSuccess/:trxID", paymentSuccess);
router.post("/paymentFail/:trxID", paymentFail);
router.post("/paymentCancel/:trxID", paymentCancel);
router.post("/paymentIPN/:trxID", paymentIPN);

//  Feature

router.get("/featureList", featureList);
router.get("/legalDetails/:type", legalDetails);

//createReview
router.post("/createReview", authVerification, productController.createReview);

module.exports = router;
