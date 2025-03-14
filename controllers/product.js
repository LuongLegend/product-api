import { Op } from 'sequelize';
import { product, shop, user, category, productCategory, productMeta } from '../models/index.js';

import { returnError, returnSuccess } from '../utils/common.js';

const addProductCategory = async (productId, categories) => {
    for (let categoryId of categories) {
        try {
            await productCategory.create({ productId, categoryId });
        } catch (error) {
            continue;
        }
    }
};

const addProductMeta = async (productId, productMetas) => {
    for (let proMeta of productMetas) {
        try {
            await productMeta.create({ productId, ...proMeta });
        } catch (error) {
            continue;
        }
    }
};

const getProducts = async (query) => {
    try {
        let { page, limit, keyword, type, priceLte, priceGte } = query;
        page = isNaN(page) ? 1 : parseInt(page);
        limit = isNaN(limit) ? 10 : parseInt(limit);
        const offset = (page - 1) * limit;

        let condition = {};
        if (type) {
            condition.type = {
                [Op.in]: [...type],
            };
        }
        if (keyword) {
            condition = {
                ...condition,
                [Op.or]: [
                    {
                        title: {
                            [Op.substring]: keyword,
                        },
                    },
                    {
                        description: {
                            [Op.substring]: keyword,
                        },
                    },
                    {
                        summary: {
                            [Op.substring]: keyword,
                        },
                    },
                ],
            };
        }

        if (priceLte && !isNaN(priceLte)) {
            condition.price = {
                [Op.lte]: Number(priceLte),
            };
        }
        if (priceGte && !isNaN(priceGte)) {
            condition.price = {
                ...condition.price,
                [Op.gte]: Number(priceGte),
            };
        }

        const products = await product.findAll({
            where: {
                ...condition,
            },
            include: [
                {
                    model: shop,
                    attributes: ['title', 'img'],
                },
                {
                    model: user,
                    attributes: ['username'],
                },
                {
                    model: productCategory,
                    attributes: ['id'],
                    include: {
                        model: category,
                        attributes: ['id', 'title', 'metaTitle', 'slug', 'content'],
                    },
                },
                {
                    model: productMeta,
                    attributes: ['id', 'weight', 'height', 'color', 'size', 'quantity', 'img'],
                },
            ],
            limit,
            offset,
        });

        return returnSuccess(products);
    } catch (error) {
        return returnError(500, error.message);
    }
};

const getProductById = async (id) => {
    try {
        const result = await product.findByPk(id);
        return returnSuccess(result);
    } catch (error) {
        console.log(error.message);
        return returnError(500, error.message);
    }
};

const addProduct = async (data) => {
    try {
        const {
            userId,
            shopId,
            title,
            frontImg,
            backImg,
            summary,
            description,
            sku,
            price,
            quantity,
            categories,
            productMeta: proMeta,
        } = data;

        if (!userId || !shopId || !title || !description || !sku) {
            return returnError(400, 'missing information');
        }
        //check sku
        const findProductWithSku = await product.findOne({
            where: {
                sku,
            },
        });
        if (findProductWithSku) {
            return returnError(400, 'Sku already existed');
        }
        //add product
        const result = await product.create(data, {
            fields: [
                'userId',
                'shopId',
                'title',
                'metaTitle',
                'slug',
                'summary',
                'description',
                'frontImg',
                'backImg',
                'sku',
                'price',
            ],
        });
        const { id: productId } = result;
        //add categories
        if (categories) {
            addProductCategory(productId, categories);
        }
        //add product meta
        if (proMeta) {
            addProductMeta(productId, proMeta);
        }
        return returnSuccess(result);
    } catch (error) {
        throw new Error(error.message);
    }
};

const updateProduct = async (id, data) => {
    try {
        const result = await product.update(data, {
            where: {
                id,
            },
            fields: [
                'userId',
                'shopId',
                'title',
                'metaTitle',
                'slug',
                'summary',
                'description',
                'frontImg',
                'backImg',
                'sku',
                'price',
                'quantity',
            ],
        });
        return returnSuccess(result);
    } catch (error) {
        return returnError(500, error.message);
    }
};

export { getProducts, getProductById, addProduct, updateProduct };
