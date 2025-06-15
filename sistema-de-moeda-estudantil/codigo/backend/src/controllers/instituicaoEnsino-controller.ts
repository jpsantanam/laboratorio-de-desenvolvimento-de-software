import express from 'express';
import InstituicaoEnsino from '../models/instituicaoEnsino';

export const create = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        const { nome } = req.body;
        if (!nome) {
            res.status(400).send({ message: 'O nome da instituição é obrigatório.' });
            return;
        }
        const existingInstituicao = await InstituicaoEnsino.findOne({ where: { nome } });
        if (existingInstituicao) {
            res.status(409).send({ message: 'Instituição de ensino com este nome já existe.' });
            return;
        }
        const novaInstituicao = await InstituicaoEnsino.create({ nome });
        res.status(201).send(novaInstituicao);
    } catch (err) {
        console.error('Erro ao criar instituição:', err);
        next(err);
    }
};

export const getAll = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        const instituicoes = await InstituicaoEnsino.findAll({ order: [['nome', 'ASC']] });
        res.status(200).send(instituicoes);
    } catch (err) {
        console.error('Erro ao listar instituições:', err);
        next(err);
    }
};

export const getById = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const instituicao = await InstituicaoEnsino.findByPk(id);
        if (instituicao) {
            res.status(200).send(instituicao);
        } else {
            res.status(404).send({ message: 'Instituição de ensino não encontrada.' });
        }
    } catch (err) {
        console.error('Erro ao buscar instituição por ID:', err);
        next(err);
    }
};

export const update = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const { nome } = req.body;
        if (!nome) {
            res.status(400).send({ message: 'O nome da instituição é obrigatório para atualização.' });
            return;
        }

        const instituicao = await InstituicaoEnsino.findByPk(id);
        if (instituicao) {
            const existingInstituicaoSameName = await InstituicaoEnsino.findOne({ where: { nome } });
            if (existingInstituicaoSameName && existingInstituicaoSameName.id !== parseInt(id)) {
                res.status(409).send({ message: 'Já existe outra instituição de ensino com este nome.' });
                return;
            }
            instituicao.nome = nome;
            await instituicao.save();
            res.status(200).send(instituicao);
        } else {
            res.status(404).send({ message: 'Instituição de ensino não encontrada para atualização.' });
        }
    } catch (err) {
        console.error('Erro ao atualizar instituição:', err);
        next(err);
    }
};

export const deleteById = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const instituicao = await InstituicaoEnsino.findByPk(id);
        if (instituicao) {
            await instituicao.destroy();
            res.status(200).send({ message: `Instituição de ensino com ID ${id} deletada com sucesso.` });
        } else {
            res.status(404).send({ message: 'Instituição de ensino não encontrada para deleção.' });
        }
    } catch (err) {
        console.error('Erro ao deletar instituição:', err);
        next(err);
    }
};
