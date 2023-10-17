const express = require("express");

const {
  checkAuthUser,
  checkAuthAdmin,
} = require("../middlewares/authMiddleware");
const formidable = require("express-formidable");
const {
  createProductController,
  userRatingController,
  categoryProductController,
  getPaymentTokenController,
  getPaymentController,
  similiarProductController,
  searchProductController,
  getProductController,
  getProductImageController,
  getSingleProductController,
  filterProductController,
  getPhotoController,
  deleteProductController,
  updateProductController,
} = require("../controllers/productController");
const router = express.Router();
//create product
router.post(
  "/create-product",
  checkAuthUser,
  checkAuthAdmin,
  createProductController
);
//get all product
router.get("/get-product", getProductController);
//all image get routes
router.get("/get-productimage", getProductImageController);

//single product controller get routes
router.get("/get-singleproduct/:slug", getSingleProductController);

//get image of given ids
router.get("/get-productPhoto/:pid", getPhotoController);

//delete image of given ids
router.delete("/delete-product/:pid", deleteProductController);

//update product data
router.put(
  "/update-product/:pid",
  checkAuthUser,
  checkAuthAdmin,
  updateProductController
);
//filter data
router.post("/filter-product", filterProductController);
//searching data

router.get("/search/:keyword", searchProductController);
//find sililiar products
router.get("/similiar-product/:pid/:cid", similiarProductController);

//find product through the category slug
router.get("/category-product/:slug", categoryProductController);

//update user rating for product
router.put("/user-rating", checkAuthUser, userRatingController);

//payment gateway api

router.get("/payment-token", getPaymentTokenController);

router.post("/payment", checkAuthUser, getPaymentController);

module.exports = router;
