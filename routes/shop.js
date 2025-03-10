import express from 'express';
import { addShop, getShop } from '../controllers/shop.js';
const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const data = req.body;
        const category = await addShop(data);
        if (category.code === 200) return res.json({ data: category.data });
        return res.status(400).json({
            msg: 'something wrong',
        });
    } catch (error) {
        error.status = 400;
        return next(error);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const categories = await getShop();
        if (categories.code === 200) return res.json({ data: categories.data });
        return res.status(400).json({
            msg: 'something wrong',
        });
    } catch (error) {
        error.status = 400;
        return next(error);
    }
});

export default router;
