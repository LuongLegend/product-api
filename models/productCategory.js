const { DataTypes } = require("sequelize");
const connectDb = require("../config/connectDB");

module.exports = connectDb.define("product_category", {
  id: {
    type: DataTypes.INTEGER,
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
