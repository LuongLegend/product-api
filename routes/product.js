const express = require("express");
const router = express.Router();

const product = require("../models/product");
router.get("/", async (req, res) => {
  try {
    const products = await product.findAll();
    return res.json({ products });
  } catch (error) {
    console.log(error);
    return res.status(503).json("loi roi");
  }
});

module.exports = router;
