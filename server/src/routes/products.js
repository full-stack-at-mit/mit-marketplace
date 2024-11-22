const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProducts,
  getServices,
} = require("../controllers/products");

const router = express.Router();

router.post("/create-product", createProduct);

router.get("/get-all-products", getAllProducts);
router.get("/products", getProducts);
router.get("/services", getServices);

module.exports = router;
