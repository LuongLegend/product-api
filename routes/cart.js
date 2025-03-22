import express from 'express';
import { addCart, removeCart, getCart } from '../controllers/cart.js';
const router = express.Router();

router.post('/:productId', async (req, res, next) => {
    try {
        const { productId } = req.params;

        const data = req.body;
        data.productId = productId;
        data.userId = req.userInfo.userId;

        const result = await addCart(data);
        return res.json(result);
    } catch (error) {
        return next(error);
    }
});

router.delete('/:productId', async (req, res, next) => {
    try {
        const { productId } = req.params;

        const data = req.body;
        data.productId = productId;
        data.userId = req.userInfo.userId;

        const result = await removeCart(data);
        return res.json(result);
    } catch (error) {
        return next(error);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const { userId } = req.userInfo;
        const carts = await getCart(userId);
        if (carts.status === 1) return res.json(carts);
        return res.json(returnError());
    } catch (error) {
        return next(error);
    }
});

export default router;
