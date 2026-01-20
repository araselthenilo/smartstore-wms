import { DataTypes } from 'sequelize';
import db from '../utils/db.util';
import bcrypt from 'bcryptjs';

const User = db.define(
    'User',
    {
        user_id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.STRING(150),
            allowNull: false
        }, 
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM('staff', 'administrator'),
            allowNull: false,
            defaultValue: 'staff'
        }
    },
    {
        tableName: 'users',
        paranoid: true,
        underscored: true,
        scopes: {
            withoutPassword: {
                attributes: { exclude: ['password'] }
            }
        },
        timestamps: true,
        hooks: {
            beforeCreate: async (user) => {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            },
            beforeUpdate: async (user) => {
                if (user.changed('password')) {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt);
                }
            }
        }
    }
);

export default User;