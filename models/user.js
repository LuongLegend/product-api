import bcrypt from 'bcrypt';
import { DataTypes } from 'sequelize';
import connectDb from '../config/connectDB.js';

const saltRounds = 10;
export default connectDb.define(
    'users',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING(40),
            allowNull: false,
            unique: true,
            validate: {
                notNull: {
                    msg: 'please enter username',
                },
                len: {
                    args: [6],
                    msg: 'username must have at least 6 characters',
                },
            },
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
                throw new Error('Do not try to set the `fullName` value!');
            },
        },
        mobile: DataTypes.STRING(15),
        email: {
            type: DataTypes.STRING(50),
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        avatar: DataTypes.STRING(200),
        description: DataTypes.TEXT,
        passwordHash: {
            type: DataTypes.STRING(100),
            allowNull: false,
            //auto hashed password before save
            set(value) {
                this.setDataValue('passwordHash', bcrypt.hashSync(value, saltRounds));
            },
        },
        type: {
            type: DataTypes.TINYINT(6),
            defaultValue: 0,
            comment: '0: normal, 1: admin, 2: sale, 3: vender',
        },
        lastLogin: DataTypes.DATE,
        intro: DataTypes.STRING(200),
        profile: DataTypes.TEXT,
        city: DataTypes.STRING(50),
        province: DataTypes.STRING(50),
        country: DataTypes.STRING(50),
        ggId: DataTypes.STRING(100),
    },
    {
        indexes: [{ unique: true, fields: ['username'] }],
    }
);
