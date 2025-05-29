import express from 'express';
import Professor from '../models/professor';
import Student from '../models/student';
import Transaction from '../models/transaction';

export const getById = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        const id = req.params.id;
        const professor = await Professor.findByPk(id);
        if (!professor) {
            res.status(404).send('Professor not found.');
            return;
        }
        res.status(200).send(professor);
    } catch (err) {
        next(err);
    }
};

export const getAll = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        const professors = await Professor.findAll();
        res.status(200).send(professors);
    } catch (err) {
        next(err);
    }
};

export const create = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        const reqBody = req.body as Professor;
        const professor = await Professor.create(reqBody);

        res.status(201).send(professor);
    } catch (err) {
        next(err);
    }
};

export const update = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        const id = req.params.id;
        const professor = await Professor.findByPk(id);
        if (!professor) {
            res.status(404).send('Professor not found.');
            return;
        }
        await professor.update(req.body);
        res.status(200).send(professor);
    } catch (err) {
        next(err);
    }
};

export const deleteById = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        const id = req.params.id;
        const professor = await Professor.findByPk(id);
        if (!professor) {
            res.status(404).send('Professor not found.');
            return;
        }
        await professor.destroy();
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};

export const login = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body;
        const professor = await Professor.findOne({ where: { email } });

        if (professor) {
            const isPasswordValid = await professor.checkPassword(password);
            if (isPasswordValid) res.status(200).send(professor);
            else res.status(401).send('Invalid password!');
        } else res.status(404).send('Professor not found!');
    } catch (err) {
        next(err);
    }
};

export const enviarMoedas = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        const { idProfessor, idAlunoDestino, quantidade, mensagem } = req.body;

        if (!idProfessor || !idAlunoDestino || !quantidade || !mensagem) {
            res.status(400).send('Missing required fields: idProfessor, idAlunoDestino, quantidade, mensagem.');
            return;
        }

        const professor = await Professor.findByPk(idProfessor);
        const aluno = await Student.findByPk(idAlunoDestino);

        if (!professor) {
            res.status(404).send('Professor originador não encontrado.');
            return;
        }
        if (!aluno) {
            res.status(404).send('Aluno destinatário não encontrado.');
            return;
        }

        const transacao = await professor.distribuirMoedas(aluno, Number(quantidade), mensagem, Transaction);

        if (transacao) {
            res.status(200).send({ message: 'Moedas enviadas com sucesso!', transacao, novoSaldoProfessor: professor.saldoMoedas, novoSaldoAluno: aluno.balance });
        } else {
            res.status(400).send('Falha ao enviar moedas. Saldo insuficiente ou quantidade inválida.');
        }
    } catch (err) {
        next(err);
    }
};

export const getExtratoProfessor = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        const { idProfessor } = req.params;

        const professor = await Professor.findByPk(idProfessor);
        if (!professor) {
            res.status(404).send({ message: 'Professor não encontrado.' });
            return;
        }

        const transacoes = await Transaction.findAll({
            where: {
                idOriginador: idProfessor,
                tipoOriginador: 'Professor'
            },
            include: [
                {
                    model: Student,
                    as: 'alunoDestinatario',
                    attributes: ['id', 'name', 'email'],
                    required: false
                }
            ],
            order: [['dataHora', 'DESC']]
        });

        res.status(200).send({ saldoMoedas: professor.saldoMoedas, transacoes });
    } catch (err) {
        next(err);
    }
};
