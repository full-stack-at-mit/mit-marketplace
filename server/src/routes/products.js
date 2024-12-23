const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProducts,
  getServices,
  getItemByID,
  ownPosts,
} = require("../controllers/products");
const { generatePresignedUrl } = require("../controllers/s3");

const router = express.Router();

router.post("/create-product", createProduct);

router.get("/get-all-products", getAllProducts);
router.get("/products", getProducts);
router.get("/services", getServices);

router.get("/get-item/:id", getItemByID);

router.get("/generate-presigned-url", generatePresignedUrl);

module.exports = router;
