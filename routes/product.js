import express from 'express';
const router = express.Router();
import { getProducts, getProductById, addProduct, updateProduct } from '../controllers/product.js';

import { verifyUser } from '../middlewares/authentication.js';
import { returnError } from '../utils/common.js';

router.get('/', async (req, res, next) => {
    try {
        const query = req.query;
        const result = await getProducts(query);

        if (result.status === 1) return res.json(result);
        return res.json(returnError());
    } catch (error) {
        return next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const products = await getProductById(id);
        if (products.status === 1) return res.json({ data: products.data });
        return res.json(returnError());
    } catch (error) {
        return next(error);
    }
});

router.post('/', verifyUser, async (req, res, next) => {
    try {
        const data = req.body;
        const { userId } = req.userInfo;
        data.userId = userId;

        const product = await addProduct(data);
        if (product.status === 1) return res.json({ data: product.data });
        return res.json(returnError(400, product.msg));
    } catch (error) {
        return next(error);
    }
});

router.put('/:id', verifyUser, async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const product = await updateProduct(id, data);
        if (product.status === 1) return res.json({ msg: 'updated success', data });
    } catch (error) {
        return next(error);
    }
});

export default router;
