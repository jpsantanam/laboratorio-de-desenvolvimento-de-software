import { DataTypes } from '@sequelize/core';
import { Table, Attribute, NotNull, Unique, Default, BelongsTo, HasMany } from '@sequelize/core/decorators-legacy';
import { User } from './user';
import InstituicaoEnsino from './instituicaoEnsino'; // Import the new model
import Student from './student';
import Transaction from './transaction';


@Table
export default class Professor extends User<Professor> {
    @Unique
    @NotNull
    @Attribute(DataTypes.STRING)
    declare cpf: string;

    @Attribute(DataTypes.STRING)
    declare departamento: string;

    @Default(1000)
    @NotNull
    @Attribute(DataTypes.FLOAT)
    declare saldoMoedas: number;

    @Attribute(DataTypes.INTEGER)
    declare idInstituicaoEnsino?: number;

    @BelongsTo(() => InstituicaoEnsino, {
        foreignKey: 'idInstituicaoEnsino'
    })
    declare instituicao?: InstituicaoEnsino;

    @HasMany(() => Transaction, { foreignKey: 'idOriginador' })
    declare transacoesComoOriginador?: Transaction[];

    async distribuirMoedas(aluno: Student, quantidade: number, mensagem: string, transactionDb: typeof Transaction): Promise<Transaction | null> {
        if (this.saldoMoedas >= quantidade && quantidade > 0) {
            this.saldoMoedas -= quantidade;
            aluno.balance = (aluno.balance || 0) + quantidade;

            const transacao = await transactionDb.create({
                idOriginador: this.id,
                tipoOriginador: 'Professor',
                idDestinatario: aluno.id,
                tipoDestinatario: 'Student',
                quantidadeMoedas: quantidade,
                mensagem: mensagem,
                dataHora: new Date(),
            });

            await this.save();
            await aluno.save();
            return transacao;
        }
        return null;
    }

    async receberCreditoSemestral(quantidade: number, transactionDb: typeof Transaction): Promise<Transaction> {
        this.saldoMoedas += quantidade;
        const transacao = await transactionDb.create({
            idOriginador: null,
            tipoOriginador: 'Sistema',
            idDestinatario: this.id,
            tipoDestinatario: 'Professor',
            quantidadeMoedas: quantidade,
            dataHora: new Date(),
        });
        await this.save();
        return transacao;
    }
}