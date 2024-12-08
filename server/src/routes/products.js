const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProducts,
  getServices,
  getItemByID,
} = require("../controllers/products");

const router = express.Router();

router.post("/create-product", createProduct);

router.get("/get-all-products", getAllProducts);
router.get("/products", getProducts);
router.get("/services", getServices);

router.get("/get-item/:id", getItemByID);

module.exports = router;
