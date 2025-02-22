const { Datatypes } = require("sequelize");
const connectDb = require("../config/connectDB");

module.exports = connectDb.define("product_meta", {
  id: {
    type: Datatypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
  },
  productId: {
    type: Datatypes.INTEGER,
    allowNull: false,
  },
  weight: Datatypes.STRING(20),
  height: Datatypes.STRING(20),
  color: Datatypes.STRING(20),
  size: Datatypes.STRING(20),
  img: Datatypes.STRING(100),
});
