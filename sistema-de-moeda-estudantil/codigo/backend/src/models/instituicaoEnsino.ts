// jpsantanam/laboratorio-de-desenvolvimento-de-software/laboratorio-de-desenvolvimento-de-software-main/sistema-de-moeda-estudantil-1/codigo/backend/src/models/instituicaoEnsino.ts
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from '@sequelize/core';
import { Table, Attribute, PrimaryKey, AutoIncrement, NotNull, HasMany } from '@sequelize/core/decorators-legacy';
import Student from './student';
import Professor from './professor';

@Table({ tableName: 'instituicoes_ensino', timestamps: false })
export default class InstituicaoEnsino extends Model<InferAttributes<InstituicaoEnsino>, InferCreationAttributes<InstituicaoEnsino>> {
    @PrimaryKey
    @AutoIncrement
    @Attribute(DataTypes.INTEGER)
    declare id: CreationOptional<number>;

    @NotNull
    @Attribute(DataTypes.STRING)
    declare nome: string;

    @HasMany(() => Student, { foreignKey: 'idInstituicaoEnsino' })
    declare alunos?: Student[];

    @HasMany(() => Professor, { foreignKey: 'idInstituicaoEnsino' })
    declare professores?: Professor[];
}