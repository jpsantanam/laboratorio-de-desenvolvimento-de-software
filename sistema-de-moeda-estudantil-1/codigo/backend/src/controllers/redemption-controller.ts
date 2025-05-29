import express from 'express';
import Student from '../models/student';
import Vantagem from '../models/vantagem';
import Redemption from '../models/redemption';
import Transaction from '../models/transaction';
import Company from '../models/company';

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
            res.status(201).send({
                message: 'Vantagem resgatada com sucesso!',
                redemption: resultado.redemption,
                novoSaldo: resultado.novoSaldo
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
