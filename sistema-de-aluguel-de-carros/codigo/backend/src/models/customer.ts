import { DataTypes, Model, Optional } from 'sequelize';
import database from '../database/db';

type CustomerAttributes = {
    id: number;
    name: string;
    email: string;
    password: string;
    rg: string;
    cpf: string;
    address: string;
    job: string;
    employer: string;
    income: [number, number, number];
};

type CustomerCreationAttributes = Optional<CustomerAttributes, 'id'>;

export default class Customer extends Model<CustomerAttributes, CustomerCreationAttributes> {
    declare id: number;
    declare name: string;
    declare email: string;
    declare password: string;
    declare rg: string;
    declare cpf: string;
    declare address: string;
    declare job: string;
    declare employer: string;
    declare income: [number, number, number];
}

Customer.init(
    {
        id: {
            type: DataTypes.INTEGER,
            unique: true,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rg: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cpf: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        job: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        employer: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        income: {
            type: DataTypes.ARRAY(DataTypes.FLOAT),
            allowNull: false,
        },
    },
    {
        sequelize: database,
        modelName: 'customer',
    }
);
