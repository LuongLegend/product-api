const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
} = require("../controllers/product");
const { verifyUser } = require("../middlewares/authentication");

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

router.post("/", verifyUser, async (req, res) => {
  try {
    const data = req.body;
    const product = await addProduct(data);
    if (product.code === 200) return res.json({ data: product.data });
    return res.status(500).json({
      msg: "something wrong",
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json("loi roi");
  }
});

router.put("/:id", verifyUser, async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const product = await updateProduct(id, data);
    if (product.code === 200) return res.json({ msg: "updated success", data });
  } catch (error) {
    console.log(error);
    return res.status(503).json("loi roi");
  }
});

module.exports = router;
