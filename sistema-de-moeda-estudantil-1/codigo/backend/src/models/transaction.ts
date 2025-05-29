import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from '@sequelize/core';
import { Table, Attribute, PrimaryKey, AutoIncrement, NotNull, Default, BelongsTo } from '@sequelize/core/decorators-legacy';
import Student from './student';
import Professor from './professor';

@Table({ tableName: 'transactions', timestamps: false })
export default class Transaction extends Model<InferAttributes<Transaction>, InferCreationAttributes<Transaction>> {
    @PrimaryKey
    @AutoIncrement
    @Attribute(DataTypes.INTEGER)
    declare id: CreationOptional<number>;

    @Attribute(DataTypes.INTEGER)
    declare idOriginador?: number | null;

    @Attribute(DataTypes.STRING)
    declare tipoOriginador?: string;

    @Attribute(DataTypes.INTEGER)
    declare idDestinatario?: number | null;

    @Attribute(DataTypes.STRING)
    declare tipoDestinatario?: string;

    @NotNull
    @Attribute(DataTypes.FLOAT)
    declare quantidadeMoedas: number;

    @Attribute(DataTypes.TEXT)
    declare mensagem?: string;

    @NotNull
    @Default(DataTypes.NOW)
    @Attribute(DataTypes.DATE)
    declare dataHora: CreationOptional<Date>;

    @BelongsTo(() => Professor, {
        foreignKey: 'idOriginador'
    })
    declare professorOriginador?: Professor;

    @BelongsTo(() => Student, {
        foreignKey: 'idDestinatario'
    })
    declare alunoDestinatario?: Student;
}