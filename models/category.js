import { DataTypes } from 'sequelize';
import connectDb from '../config/connectDB.js';
import { changeAlias } from '../utils/common.js';

const category = connectDb.define('category', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING(75),
        allowNull: false,
        set(value) {
            const alias = changeAlias(value);
            this.setDataValue('metaTitle', alias);
            this.setDataValue('slug', alias);
            this.setDataValue('title', value);
        },
    },
    metaTitle: {
        type: DataTypes.STRING(100),
        get() {
            const id = this.getDataValue('id');
            const metaTitle = this.getDataValue('metaTitle');
            return `${metaTitle}-${id}`;
        },
    },
    image: DataTypes.STRING(100),
    slug: {
        type: DataTypes.STRING(100),
    },
    content: DataTypes.TEXT,
});

export default category;
