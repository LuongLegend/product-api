import { DataTypes } from 'sequelize';
import connectDb from '../config/connectDB.js';

const cart = connectDb.define(
    'cart',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        productMetaId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'userId' }, { name: 'productId' }, { name: 'productMetaId' }],
            },
        ],
    }
);

export default cart;
