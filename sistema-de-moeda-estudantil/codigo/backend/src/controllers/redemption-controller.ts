import express from 'express';
import Student from '../models/student';
import Vantagem from '../models/vantagem';
import Redemption from '../models/redemption';
import Transaction from '../models/transaction';
import Company from '../models/company';
import { sendEmail } from '../services/email-service';

export const create = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        const { idAluno, idVantagem } = req.body;

        if (!idAluno || !idVantagem) {
            res.status(400).send({ message: 'idAluno e idVantagem são obrigatórios.' });
            return;
        }

        const aluno = await Student.findByPk(idAluno);
        const vantagem = await Vantagem.findByPk(idVantagem);

        if (!aluno) {
            res.status(404).send({ message: 'Aluno não encontrado.' });
            return;
        }
        if (!vantagem) {
            res.status(404).send({ message: 'Vantagem não encontrada.' });
            return;
        }

        const resultado = await aluno.resgatarVantagem(vantagem, Redemption, Transaction);

        if (typeof resultado === 'string') {
            res.status(400).send({ message: resultado });
        } else {
            const { redemption, novoSaldo } = resultado;

            // Envio de email para o Aluno
            const alunoEmailSubject = `Vantagem "${vantagem.nome}" resgatada!`;
            const alunoEmailHtml = `
                <h1>Vantagem Resgatada!</h1>
                <p>Olá, ${aluno.name},</p>
                <p>Você resgatou a vantagem: <strong>${vantagem.nome}</strong>.</p>
                <p>Seu código de resgate é: <strong>${redemption.codigoResgate}</strong></p>
                <p>Apresente este código para utilizar sua vantagem.</p>
                <p>Custo: ${vantagem.custoMoedas} moedas.</p>
                <p>Seu novo saldo é: ${novoSaldo} moedas.</p>
            `;
            await sendEmail(aluno.email, alunoEmailSubject, alunoEmailHtml); // Descomente e ajuste

            if (vantagem.empresa && vantagem.empresa.email) {
                const empresaEmailSubject = `Alerta de Resgate: Vantagem "${vantagem.nome}"`;
                const empresaEmailHtml = `
                    <h1>Notificação de Resgate de Vantagem</h1>
                    <p>Prezada ${vantagem.empresa.name},</p>
                    <p>A vantagem "<strong>${vantagem.nome}</strong>" foi resgatada pelo aluno ${aluno.name} (Email: ${aluno.email}).</p>
                    <p>O código de resgate é: <strong>${redemption.codigoResgate}</strong></p>
                    <p>Data do resgate: ${new Date(redemption.dataHora).toLocaleString()}</p>
                `;
                await sendEmail(vantagem.empresa.email, empresaEmailSubject, empresaEmailHtml); // Descomente e ajuste
            }

            res.status(201).send({
                message: 'Vantagem resgatada com sucesso!',
                redemption: redemption,
                novoSaldo: novoSaldo
            });
        }
    } catch (err) {
        next(err);
    }
};

export const getByAluno = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        const { idAluno } = req.params;
        const redemptions = await Redemption.findAll({
            where: { idAluno: Number(idAluno) },
            include: [{
                model: Vantagem,
                as: 'vantagem',
                attributes: ['id', 'nome', 'foto'],
                include: [{
                    model: Company,
                    as: 'empresa',
                    attributes: ['id', 'name']
                }]
            }],
            order: [['dataHora', 'DESC']]
        });
        res.status(200).send(redemptions);
    } catch (err) {
        next(err);
    }
};
