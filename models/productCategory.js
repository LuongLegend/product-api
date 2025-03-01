import { DataTypes } from "sequelize";
import connectDb from "../config/connectDB.js";

const productCategory = connectDb.define("product_category", {
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

export default productCategory;
