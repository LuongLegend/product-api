const { DataTypes } = require("sequelize");
const connectDb = require("../config/connectDB");

module.exports = connectDb.define("category", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(75),
    allowNull: false,
  },
  metaTitle: DataTypes.STRING(100),
  slug: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  content: DataTypes.TEXT,
});
