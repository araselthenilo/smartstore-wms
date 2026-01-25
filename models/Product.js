import { DataTypes } from 'sequelize';
import db from '../utils/db.util.js';

const Product = db.define(
    'Product',
    {
        product_id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        category_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: 'categories',
                key: 'category_id'
            }, 
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT'
        },
        sku: {
            type: DataTypes.STRING(40),
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        stock_quantity: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: 0
        },
        min_stock_level: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: 0
        }
    },
    {
        tableName: 'products',
        paranoid: true,
        underscored: true,
        timestamps: true
    }
);

export default Product;