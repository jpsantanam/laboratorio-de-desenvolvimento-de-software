import { DataTypes } from '@sequelize/core';
import { Table, Attribute, NotNull, Unique, HasMany } from '@sequelize/core/decorators-legacy';
import { User } from './user';
import Vantagem from './vantagem';

@Table
export default class Company extends User<Company> {
    @Unique
    @NotNull
    @Attribute(DataTypes.STRING)
    cnpj: string;

    @HasMany(() => Vantagem, {
        foreignKey: 'idEmpresa'
    })
    declare vantagensOferecidas?: Vantagem[];
}