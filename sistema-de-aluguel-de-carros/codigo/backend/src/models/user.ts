import { DataTypes, Model, Optional } from 'sequelize';
import database from '../database/db';

interface UserAttributes {
    id: number;
    createdAt: Date;
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'operator';
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export default class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public createdAt!: Date;
    public name!: string;
    public email!: string;
    public password!: string;
    public role!: 'admin' | 'operator';
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            unique: true,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: new Date()
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
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('admin', 'operator'),
            defaultValue: 'operator',
            allowNull: false
        }
    },
    {
        sequelize: database,
        modelName: 'user'
    }
);