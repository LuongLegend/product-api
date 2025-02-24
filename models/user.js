const bcrypt = require("bcrypt");
const { DataTypes } = require("sequelize");
const connectDb = require("../config/connectDB");

const saltRounds = 10;
module.exports = connectDb.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    firstName: DataTypes.STRING(20),
    lastName: DataTypes.STRING(20),
    fullName: {
      //VIRTUAL kiểu dữ liệu này sẽ giúp trường fullName k lưu trong db
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.firstName} ${this.lastName}`;
      },
      set(value) {
        throw new Error("Do not try to set the `fullName` value!");
      },
    },
    mobile: DataTypes.STRING(15),
    email: {
      type: DataTypes.STRING(50),
      validate: {
        isEmail: true,
      },
    },
    avatar: DataTypes.STRING(200),
    description: DataTypes.TEXT,
    passwordHash: {
      type: DataTypes.STRING(32),
      allowNull: false,
      //auto hashed password before save
      set(value) {
        this.setDataValue("passwordHash", bcrypt.hashSync(value, saltRounds));
      },
    },
    type: {
      type: DataTypes.TINYINT(6),
      comment: "0: normal, 1: admin, 2: sale, 3: vender",
    },
    registeredAt: DataTypes.INTEGER,
    lastLogin: DataTypes.INTEGER,
    intro: DataTypes.STRING(200),
    profile: DataTypes.TEXT,
    city: DataTypes.STRING(50),
    province: DataTypes.STRING(50),
    country: DataTypes.STRING(50),
  },
  {
    indexes: [{ unique: true, fields: ["username"] }],
  }
);
