// jpsantanam/laboratorio-de-desenvolvimento-de-software/laboratorio-de-desenvolvimento-de-software-main/sistema-de-moeda-estudantil-1/codigo/backend/src/models/redemption.ts
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from '@sequelize/core';
import { Table, Attribute, PrimaryKey, AutoIncrement, NotNull, BelongsTo, Default, Unique } from '@sequelize/core/decorators-legacy';
import Student from './student';
import Vantagem from './vantagem';

@Table({ tableName: 'redemptions', timestamps: false })
export default class Redemption extends Model<InferAttributes<Redemption>, InferCreationAttributes<Redemption>> {
    @PrimaryKey
    @AutoIncrement
    @Attribute(DataTypes.INTEGER)
    declare id: CreationOptional<number>;

    @NotNull
    @Attribute(DataTypes.INTEGER)
    declare idAluno: number;

    @NotNull
    @Attribute(DataTypes.INTEGER)
    declare idVantagem: number;

    @NotNull
    @Attribute(DataTypes.FLOAT)
    declare custoMoedasNoMomentoDaTroca: number;

    @Unique
    @NotNull
    @Attribute(DataTypes.STRING)
    declare codigoResgate: string;

    @NotNull
    @Default(DataTypes.NOW)
    @Attribute(DataTypes.DATE)
    declare dataHora: CreationOptional<Date>;

    @BelongsTo(() => Student, {
        foreignKey: 'idAluno'
    })
    declare aluno?: Student;

    @BelongsTo(() => Vantagem, {
        foreignKey: 'idVantagem'
    })
    declare vantagem?: Vantagem;
}