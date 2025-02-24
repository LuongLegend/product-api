const { DataTypes } = require("sequelize");
const connectDb = require("../config/connectDB");

module.exports = connectDb.define("product_meta", {
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
  weight: DataTypes.STRING(20),
  height: DataTypes.STRING(20),
  color: DataTypes.STRING(20),
  size: DataTypes.STRING(20),
  img: DataTypes.STRING(100),
});
