import { DataTypes } from 'sequelize';
import db from '../utils/db.util.js';

const Category = db.define(
    'Category',
    {
        category_id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(150),
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        tableName: 'categories',
        paranoid: true,
        underscored: true,
        timestamps: true
    }
);

export default Category;