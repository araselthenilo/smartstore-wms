import { DataTypes } from 'sequelize';
import db from '../utils/db.util.js';

const InventoryLog = db.define(
    'InventoryLog',
    {
        inventory_log_id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        product_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                    model: 'products',
                    key: 'product_id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        user_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                    model: 'users',
                    key: 'user_id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        type: {
            type: DataTypes.ENUM('In', 'Out'),
            allowNull: false
        },
        quantity: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        reason: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        tableName: 'inventory_logs',
        paranoid: true,
        underscored: true,
        timestamps: true
    }
);

export default InventoryLog;