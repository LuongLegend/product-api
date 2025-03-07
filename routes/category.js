import express from 'express';
import { addCategory } from '../controllers/category.js';
const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const data = req.body;
        const category = await addCategory(data);
        if (category.code === 200) return res.json({ data: category.data });
        return res.status(400).json({
            msg: 'something wrong',
        });

    } catch (error) {
        error.status = 400;
        return next(error);
    }
});

export default router;
