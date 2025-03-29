import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import database from '../database/db';
import Vehicle from './vehicle';
import Customer from './customer';

export default class Rent extends Model<InferAttributes<Rent>, InferCreationAttributes<Rent>> {
    declare id: CreationOptional<number>;
    declare vehicleId: number;
    declare customerId: number;
    declare status: string;
    declare startDate: CreationOptional<Date>;
    declare endDate: CreationOptional<Date>;
}

Rent.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        vehicleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Vehicle,
                key: 'id',
            },
        },
        customerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Customer,
                key: 'id',
            },
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        startDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize: database,
        tableName: 'rents',
    }
);

Customer.hasMany(Rent, { foreignKey: "customerId" });
Rent.belongsTo(Customer, { foreignKey: "customerId" });

Vehicle.hasMany(Rent, { foreignKey: "vehicleId" });
Rent.belongsTo(Vehicle, { foreignKey: "vehicleId" });