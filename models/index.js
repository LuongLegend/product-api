const product = require("./product");
const user = require("./user");
const category = require("./category");
const productCategory = require("./productCategory");
const productMeta = require("./productMeta");
const shop = require("./shop");
//product - user
user.hasMany(product, {
  foreignKey: "userId",
});
product.belongsTo(user);

//product-shop
shop.hasMany(product, {
  foreignKey: "shopId",
});
product.belongsTo(user);
//product-productMeta
product.hasMany(productMeta);
productMeta.belongsTo(product);
//product-productCategory
product.hasMany(productCategory);
productCategory.belongsTo(product);
//category-product_category
category.hasMany(productCategory);
productCategory.belongsTo(category);

module.exports = {
  user,
  product,
  category,
  productCategory,
  productMeta,
  shop,
};
