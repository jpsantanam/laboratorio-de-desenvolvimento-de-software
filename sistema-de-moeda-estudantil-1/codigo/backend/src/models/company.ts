import { DataTypes } from '@sequelize/core';
import { Table, Attribute, NotNull, Unique, Default } from '@sequelize/core/decorators-legacy';
import { User } from './user';

@Table
export default class Company extends User<Company> {
    @Unique
    @NotNull
    @Attribute(DataTypes.STRING)
    cnpj: string;
}