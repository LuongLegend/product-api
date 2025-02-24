const express = require("express");
const router = express.Router();
const { getProducts, getProductById } = require("../controllers/product");

router.get("/", async (req, res) => {
  try {
    const query = req.query;
    const products = await getProducts(query);

    if (products.code === 200) return res.json({ data: products.data });
    return res.status(500).json({
      msg: "something wrong",
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json("loi roi");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const products = await getProductById(id);
    if (products.code === 200) return res.json({ data: products.data });
    return res.status(500).json({
      msg: "something wrong",
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json("loi roi");
  }
});

module.exports = router;
