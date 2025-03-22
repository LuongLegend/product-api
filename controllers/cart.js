import { cart } from '../models/index.js';
import { returnError, returnSuccess } from '../utils/common.js';

const findCart = async ({ userId, productId, productMetaId }) => {
    const result = await cart.findOne({ where: { userId, productId, productMetaId } });
    return result;
};
const addCart = async (data) => {
    const cartExisted = await findCart(data);
    const { productMetaId, quantity } = data;
    if (!quantity || !productMetaId) return returnError(400, 'Invalid input');

    if (cartExisted) {
        const result = await cartExisted.increment({ quantity });
        return returnSuccess(result);
    }
    const result = await cart.create(data, {
        fields: ['userId', 'productId', 'productMetaId'],
    });
    return returnSuccess(result);
};

const removeCart = async (data) => {
    const { productMetaId, quantity } = data;
    if (!productMetaId) return returnError(400, 'Invalid input');
    const cartExisted = await findCart(data);
    if (!cartExisted) return returnError(500, 'Cart is not existed!');
    if (quantity) {
        await cartExisted.decrement({ quantity });
        return returnSuccess({}, 'decrement successfully!');
    }
    await cartExisted.destroy();
    return returnSuccess({}, 'Remove successfully!');
};

const getCart = async (userId) => {
    const result = await cart.findAll({
        where: {
            userId,
        },
    });
    return returnSuccess(result);
};

export { addCart, removeCart, getCart };
