import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
} from "../controllers/product.js";

import { verifyUser } from "../middlewares/authentication.js";

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

export default router;
