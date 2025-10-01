const express = require("express");
const router = express.Router();
const {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");

// Create
router.post("/", createProduct);

// Read
router.get("/", getProducts);

// Update
router.put("/:id", updateProduct);

// Delete
router.delete("/:id", deleteProduct);

module.exports = router;
