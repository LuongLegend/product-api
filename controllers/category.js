import { category } from '../models/index.js';
import { returnSuccess } from './config.js';

const addCategory = async (data) => {
    const result = await category.create(data, {
        fields: ['title', 'content', 'image'],
    });
    return returnSuccess(result);
};

export { addCategory };
