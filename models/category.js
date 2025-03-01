import { DataTypes } from "sequelize";
import connectDb from "../config/connectDB.js";

const category = connectDb.define("category", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
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

export default category;