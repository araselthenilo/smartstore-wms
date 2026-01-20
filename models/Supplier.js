import { DataTypes } from 'sequelize';
import db from '../utils/db.util.js';

const Supplier = db.define(
    'Supplier',
    {
        supplier_id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(150),
            allowNull: false
        }, 
        contact_person: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    },
    {
        tableName: 'suppliers',
        paranoid: true,
        underscored: true,
        timestamps: true
    }
);

export default Supplier;