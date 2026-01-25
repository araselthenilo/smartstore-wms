import { DataTypes } from 'sequelize';
import db from '../utils/db.util.js';

const PurchaseOrder = db.define(
    'PurchaseOrder',
    {
        purchase_order_id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        supplier_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: 'suppliers',
                key: 'supplier_id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT'
        },
        product_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: 'products',
                key: 'product_id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT'
        },
        admin_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: 'users',
                key: 'user_id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT'
        },
        quantity: {
            type: DataTypes.BIGINT,
            allowNull: false,
            validate: {
                min: 1
            }
        },
        total_price: {
            type: DataTypes.DECIMAL(15,2),
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('pending','received','canceled'),
            allowNull: false,
            defaultValue: 'pending'
        }
    },
    {
        tableName: 'purchase_orders',
        paranoid: true,
        underscored: true,
        timestamps: true
    }
);

export default PurchaseOrder;