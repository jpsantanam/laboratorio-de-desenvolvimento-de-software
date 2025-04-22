import { DataTypes } from '@sequelize/core';
import { Table, Attribute, NotNull, Unique, Default } from '@sequelize/core/decorators-legacy';
import { User } from './user';

@Table
export default class Student extends User<Student> {
    @Unique
    @NotNull
    @Attribute(DataTypes.STRING)
    declare cpf: string;

    @Unique
    @NotNull
    @Attribute(DataTypes.STRING)
    declare rg: string;

    @Attribute(DataTypes.STRING)
    declare address: string;

    @Default(0)
    @NotNull
    @Attribute(DataTypes.FLOAT)
    declare balance?: number;
}