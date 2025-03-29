import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import database from '../database/db';
import bcrypt from 'bcrypt';

export default class Customer extends Model<InferAttributes<Customer>, InferCreationAttributes<Customer>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare email: string;
    declare password: string;
    declare rg: string;
    declare cpf: string;
    declare address: string;
    declare job: string;
    declare employer: string;
    declare income: number[];

    async checkPassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
}

Customer.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
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
            unique: true,
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
            type: DataTypes.JSON,
            allowNull: false,
        },
    },
    {
        sequelize: database,
        tableName: 'customers',
        hooks: {
            beforeCreate: async (customer: Customer) => {
                customer.password = await bcrypt.hash(customer.password, 10);
            },
            beforeUpdate: async (customer: Customer) => {
                if (customer.changed('password')) {
                    customer.password = await bcrypt.hash(customer.password, 10);
                }
            },
        },
    }
);
