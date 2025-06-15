import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from '@sequelize/core';
import { Table, Attribute, PrimaryKey, AutoIncrement, NotNull, BelongsTo, HasMany } from '@sequelize/core/decorators-legacy';
import Company from './company';
import Redemption from './redemption';

@Table({ tableName: 'vantagens', timestamps: false })
export default class Vantagem extends Model<InferAttributes<Vantagem>, InferCreationAttributes<Vantagem>> {
    @PrimaryKey
    @AutoIncrement
    @Attribute(DataTypes.INTEGER)
    declare id: CreationOptional<number>;

    @NotNull
    @Attribute(DataTypes.STRING)
    declare nome: string;

    @NotNull
    @Attribute(DataTypes.TEXT)
    declare descricao: string;

    @Attribute(DataTypes.STRING)
    declare foto?: string;

    @NotNull
    @Attribute(DataTypes.FLOAT)
    declare custoMoedas: number;

    @NotNull
    @Attribute(DataTypes.INTEGER)
    declare idEmpresa: number;

    @BelongsTo(() => Company, {
        foreignKey: 'idEmpresa'
    })
    declare empresa?: Company;

    @HasMany(() => Redemption, {
        foreignKey: 'idVantagem'
    })
    declare resgates?: Redemption[];
}
