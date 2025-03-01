import { DataTypes } from "sequelize";
import connectDb from "../config/connectDB.js";

const shop = connectDb.define("shop", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
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

export default shop;
