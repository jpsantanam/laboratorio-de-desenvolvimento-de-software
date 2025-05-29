import { DataTypes } from '@sequelize/core';
import { Table, Attribute, NotNull, Unique, Default, BelongsTo, HasMany } from '@sequelize/core/decorators-legacy';
import { User } from './user';
import InstituicaoEnsino from './instituicaoEnsino';
import Transaction from './transaction';
import Redemption from './redemption';
import Vantagem from './vantagem';
import { randomBytes } from 'crypto';

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
    declare balance: number;

    @Attribute(DataTypes.INTEGER)
    declare idInstituicaoEnsino?: number;

    @BelongsTo(() => InstituicaoEnsino, {
        foreignKey: 'idInstituicaoEnsino',
    })
    declare instituicao?: InstituicaoEnsino;

    @HasMany(() => Transaction, { foreignKey: 'idDestinatario' })
    declare transacoesComoDestinatario?: Transaction[];

    @HasMany(() => Redemption, {
        foreignKey: 'idAluno'
    })
    declare resgatesEfetuados?: Redemption[];

    async resgatarVantagem(vantagem: Vantagem, redemptionDb: typeof Redemption, transactionDb: typeof Transaction): Promise<{ redemption: Redemption; novoSaldo: number } | string> {
        if ((this.balance || 0) >= vantagem.custoMoedas) {
            const saldoAnterior = this.balance || 0;
            this.balance = saldoAnterior - vantagem.custoMoedas;

            const codigoResgate = randomBytes(6).toString('hex').toUpperCase();

            const redemption = await redemptionDb.create({
                idAluno: this.id!,
                idVantagem: vantagem.id!,
                custoMoedasNoMomentoDaTroca: vantagem.custoMoedas,
                codigoResgate: codigoResgate,
                dataHora: new Date()
            });

            await transactionDb.create({
                idOriginador: this.id,
                tipoOriginador: 'Student',
                quantidadeMoedas: -vantagem.custoMoedas,
                mensagem: `Resgate da vantagem: ${vantagem.nome} (Cód: ${codigoResgate})`,
                dataHora: new Date(),
            });

            await this.save();

            return { redemption, novoSaldo: this.balance };
        }
        return "Saldo insuficiente para realizar esta troca.";
    }
}
