import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import database from '../database/db';

export default class Vehicle extends Model<InferAttributes<Vehicle>, InferCreationAttributes<Vehicle>> {
    declare id: CreationOptional<number>;
    declare model: string;
    declare brand: string;
    declare year: number;
    declare plate: string;
}

Vehicle.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        model: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        brand: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        plate: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize: database,
        tableName: 'vehicles',
    }
);