const express = require("express");
const { createProduct, getAllProducts } = require("../controllers/products");

const router = express.Router();

router.post("/create-product", createProduct);

router.get("/get-all-products", getAllProducts);

module.exports = router;
