import express from 'express';
import { addShop, getShop } from '../controllers/shop.js';
import { returnError } from '../utils/common.js';
const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const data = req.body;
        const category = await addShop(data);
        if (category.status === 1) return res.json({ data: category.data });
        return res.json(returnError());
    } catch (error) {
        return next(error);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const categories = await getShop();
        if (categories.status === 1) return res.json({ data: categories.data });
        return res.json(returnError());
    } catch (error) {
        error.status = 400;
        return next(error);
    }
});

export default router;
