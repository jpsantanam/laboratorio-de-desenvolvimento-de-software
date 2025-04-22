import { Model, InferAttributes, InferCreationAttributes, DataTypes } from '@sequelize/core';
import { Table, AutoIncrement, Attribute, PrimaryKey, NotNull, Unique } from '@sequelize/core/decorators-legacy';

@Table.Abstract({})
export abstract class User<M extends User<M>> extends Model<InferAttributes<M>, InferCreationAttributes<M>> {
    @PrimaryKey
    @AutoIncrement
    @Attribute(DataTypes.INTEGER)
    declare id?: number;

    @Attribute(DataTypes.STRING)
    declare name: string;

    @Unique
    @NotNull
    @Attribute(DataTypes.STRING)
    declare email: string;

    @NotNull
    @Attribute(DataTypes.STRING)
    declare password: string;

    async checkPassword(password: string): Promise<boolean> {
        return password === this.password;
    }
}