import express from 'express';
import Vantagem from '../models/vantagem';
import Company from '../models/company';

export const create = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        const { idEmpresa, nome, descricao, foto, custoMoedas } = req.body;

        if (!idEmpresa || !nome || !descricao || custoMoedas === undefined) {
            res.status(400).send({ message: 'Campos obrigatórios: idEmpresa, nome, descricao, custoMoedas.' });
            return;
        }
        if (Number(custoMoedas) <= 0) {
            res.status(400).send({ message: 'Custo em moedas deve ser positivo.' });
            return;
        }
        const empresa = await Company.findByPk(idEmpresa);
        if (!empresa) {
            res.status(404).send({ message: `Empresa com ID ${idEmpresa} não encontrada.` });
            return;
        }

        const vantagem = await Vantagem.create({
            idEmpresa,
            nome,
            descricao,
            foto,
            custoMoedas: Number(custoMoedas)
        });
        res.status(201).send(vantagem);
    } catch (err) {
        console.error("Erro ao criar vantagem:", err)
        next(err);
    }
};

export const get = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        const vantagens = await Vantagem.findAll({
            include: [{
                model: Company,
                as: 'empresa',
                attributes: ['id', 'name']
            }],
            order: [['custoMoedas', 'ASC'], ['nome', 'ASC']]
        });
        res.status(200).send(vantagens);
    } catch (err) {
        next(err);
    }
};

export const getByEmpresa = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        const { idEmpresa } = req.params;
        const vantagens = await Vantagem.findAll({
            where: { idEmpresa: Number(idEmpresa) },
            include: [{
                model: Company,
                as: 'empresa',
                attributes: ['id', 'name']
            }],
            order: [['nome', 'ASC']]
        });
        res.status(200).send(vantagens);
    } catch (err) {
        next(err);
    }
};
