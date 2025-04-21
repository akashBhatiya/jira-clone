import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/database';

import * as Types from '../../Types';

// Interface for creation attributes - these are the fields you can pass to create()
export interface UserCreationAttributes extends Optional<Types.UserAttributes, 'id'> { }

// User model definition
    export class User extends Model<Types.UserAttributes, UserCreationAttributes> implements Types.UserAttributes {
    public id!: number;
    public uid!: string;
    public credit!: number;
    public lastLogin!: Date;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        uid: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        credit: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        lastLogin: {
            type: DataTypes.DATE,
            allowNull: true
        }
    },
    {
        sequelize,
        tableName: 'users',
        timestamps: true,
        underscored: true // Use snake_case for column names in the database
    }
);