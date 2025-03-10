import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import 'dotenv/config';

import morganMiddleware from './middlewares/winstonMiddleware.js';
import errorHandlingMiddleware from './middlewares/errorHandling.js';
import upload from './middlewares/upload.js';

import user from './routes/user.js';
import products from './routes/product.js';
import category from './routes/category.js';
import login from './routes/login.js';

const PORT = process.env.PORT || 3000;
const app = express();

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 100,
    message: 'Bạn đã gửi quá nhiều yêu cầu, vui lòng thử lại sau!',
    headers: true, // Trả về thông tin giới hạn trong headers
});

app.use(cors());
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morganMiddleware);

app.post('/upload', upload.single('image'), (req, res) => {
    return res.json(req.file.filename);
});

app.use('/images', express.static('images'));
app.use('/product', products);
app.use('/category', category);
app.use('/user', user);
app.use(login);

app.get('/', (req, res, next) => {
    return res.json({ msg: 'hello world' });
});

app.use(errorHandlingMiddleware);

app.listen(PORT, () => console.log(`app is listening port: ${PORT}`));
