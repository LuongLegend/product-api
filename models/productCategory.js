const { DataTypes } = require("sequelize");
const connectDb = require("../config/connectDB");

const ProductCategory = connectDb.define("product_category", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

 
module.exports = ProductCategory;