import { DataTypes } from "sequelize";
import connectDb from "../config/connectDB.js";
import { changeAlias } from "../utils/common.js";

const product = connectDb.define(
  "products",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    shopId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(75),
      allowNull: false,
      set(value) {
        const alias = changeAlias(value);
        this.setDataValue('title', value);
        this.setDataValue('slug', alias);
    },
    },
    metaTitle: {
      type: DataTypes.STRING(100),
    },
    slug: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    summary: DataTypes.TEXT,
    description: DataTypes.TEXT,
    frontImg: DataTypes.STRING(100),
    backImg: DataTypes.STRING(100),
    status: {
      type: DataTypes.TINYINT(1),
      defaultValue: 0,
    },
    tags: DataTypes.STRING(100),
    type: DataTypes.TINYINT(6),
    sku: DataTypes.STRING(100),
    price: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    discount: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    updatedBy: DataTypes.INTEGER,
    publishedAt: DataTypes.INTEGER,
    publishedBy: DataTypes.INTEGER,
    startsAt: DataTypes.INTEGER,
    endsAt: DataTypes.INTEGER,
  },
  {
    indexes: [{ unique: true, fields: ["sku"] }],
  }
);

export default product;