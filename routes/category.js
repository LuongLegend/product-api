import express from 'express';
import { addCategory, getCategories } from '../controllers/category.js';
const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const data = req.body;
        const category = await addCategory(data);
        if (category.status === 1) return res.json({ data: category.data });
        return res.json(returnError());
    } catch (error) {
        return next(error);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const categories = await getCategories();
        if (categories.status === 1) return res.json({ data: categories.data });
        return res.json(returnError());
    } catch (error) {
        error.status = 400;
        return next(error);
    }
});

export default router;
