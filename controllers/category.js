import { category } from '../models/index.js';
import { returnSuccess } from '../utils/common.js';

const addCategory = async (data) => {
    const result = await category.create(data, {
        fields: ['title', 'content', 'image', 'slug', 'metaTitle'],
    });
    return returnSuccess(result);
};

const getCategories = async () => {
    const result = await category.findAll({});
    return returnSuccess(result);
};

export { addCategory, getCategories };
