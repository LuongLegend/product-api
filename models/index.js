import product from './product.js';
import user from './user.js';
import category from './category.js';
import productCategory from './productCategory.js';
import productMeta from './productMeta.js';
import shop from './shop.js';
import cart from './cart.js';
//product - user
user.hasMany(product, {
    foreignKey: 'userId',
});
product.belongsTo(user);

//product-shop
shop.hasMany(product, {
    foreignKey: 'shopId',
});
product.belongsTo(shop);
//product-productMeta
product.hasMany(productMeta);
productMeta.belongsTo(product);
//product-productCategory
product.hasMany(productCategory);
productCategory.belongsTo(product);
//category-product_category
category.hasMany(productCategory);
productCategory.belongsTo(category);
//cart
cart.belongsTo(user, { as: 'acc', foreignKey: 'userId' });
user.hasMany(cart, { as: 'cart', foreignKey: 'userId' });
cart.belongsTo(product, { as: 'product', foreignKey: 'productId' });
product.hasMany(cart, { as: 'cart', foreignKey: 'productId' });
cart.belongsTo(productMeta, { as: 'productMeta', foreignKey: 'productMetaId' });
productMeta.hasMany(cart, { as: 'cart', foreignKey: 'productMetaId' });

export { user, product, category, productCategory, productMeta, shop, cart };
