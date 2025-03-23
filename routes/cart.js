import express from 'express';
import { addCart, removeCart, getCart, updateCart } from '../controllers/cart.js';
import { cartMetaIdValidator, cartValidator } from '../validator/cart.js';
import { validationResult } from 'express-validator';
import { returnError } from '../utils/common.js';

const router = express.Router();

router.post('/:productId', cartValidator, async (req, res, next) => {
    try {
        const { productId } = req.params;
        const checkInput = validationResult(req);
        if (!checkInput.isEmpty()) {
            return res.json(returnError(400, 'invalid input'));
        }

        const data = {
            ...req.body,
            productId,
            userId: req.userInfo.userId,
        };

        const result = await addCart(data);
        return res.json(result);
    } catch (error) {
        return next(error);
    }
});

router.put('/:productId',cartValidator, async (req, res, next) => {
    try {
        const { productId } = req.params;

        const data = req.body;
        data.productId = productId;
        data.userId = req.userInfo.userId;

        const result = await updateCart(data);
        return res.json(result);
    } catch (error) {
        return next(error);
    }
});

router.delete('/:productId',cartMetaIdValidator, async (req, res, next) => {
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
