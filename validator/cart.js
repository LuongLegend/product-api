import { body } from 'express-validator';

const cartMetaIdValidator = [body('productMetaId').exists().isInt()];
const cartValidator = [body('productMetaId').exists().isInt(), body('quantity').exists().isInt()];

export { cartValidator, cartMetaIdValidator };
