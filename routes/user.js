import express from 'express';
import { loginGgUser, loginUser, registerUser } from '../controllers/user.js';
const router = express.Router();

router
    .route(':/id')
    .get((req, res) => {
        const { id } = req.params;
        const u = {
            id,
            name: '',
            age: 20,
        };
        return res.json(u);
    })
    .put((req, res) => {
        const { id } = req.params;
        const { name, age } = req.body;
        const newU = {
            id,
            name,
            age,
        };
        return res.json(newU);
    });

router.post('/register', async (req, res, next) => {
    try {
        const result = await registerUser(req.body);
        if (result && result.status === 0) {
            return res.json({ status: 0, msg: result.msg });
        }
        return res.json({ status: 1, msg: 'register successful' });
    } catch (error) {
        error.status = 400;
        return next(error);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const result = await loginUser(req.body);
        if (result && result.status === 0) {
            return res.json({ status: 0, msg: result.msg });
        }
        const { token } = result.data;
        return res.json({ status: 1, msg: 'login successful', token });
    } catch (error) {
        return next(error);
    }
});

router.post('/login/gg', async (req, res, next) => {
    try {
        const result = await loginGgUser(req.body);
        if (result && result.status === 0) {
            return res.json({ status: 0, msg: result.msg });
        }

        const { token } = result.data;
        return res.json({ status: 1, msg: 'login successful', token });
    } catch (error) {
        return next(error);
    }
});

export default router;
