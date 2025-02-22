const connectDb = require("../config/connectDB");
const { DataTypes } = require("sequelize");

module.exports = connectDb.define("users", {
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
});
