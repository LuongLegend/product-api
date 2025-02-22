const { DataTypes } = require("sequelize");
const connectDb = require("../config/connectDB");

module.exports = connectDb.define("shop", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(75),
    allowNull: false,
  },
  img: DataTypes.STRING(75),
  description: DataTypes.STRING(200),
});
