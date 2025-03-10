import { shop } from '../models/index.js';
import { returnSuccess } from './config.js';

const addShop = async (data) => {
    const result = await shop.create(data, {
        fields: ['title', 'image', 'description'],
    });
    return returnSuccess(result);
};

const getShop = async () => {
    const result = await shop.findAll({});
    return returnSuccess(result);
};

export { addShop, getShop };
