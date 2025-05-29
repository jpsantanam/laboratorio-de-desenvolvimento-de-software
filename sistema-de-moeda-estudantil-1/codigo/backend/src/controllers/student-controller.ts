import express from 'express';
import Student from '../models/student';
import Transaction from '../models/transaction';

export const getById = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        const id = req.params.id;
        const student = await Student.findByPk(id);

        if (student) res.status(200).send(student);
        else res.status(404).send('Student not found!');
    } catch (err) {
        next(err);
    }
};

export const getAll = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        const students = await Student.findAll();

        res.status(200).send(students);
    } catch (err) {
        next(err);
    }
};

export const create = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        const reqBody = req.body as Student;
        const student = await Student.create(reqBody);

        res.status(201).send(student);
    } catch (err) {
        next(err);
    }
};

export const update = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        const id = req.params.id;
        const reqBody = req.body as Student;

        const student = await Student.findByPk(id);

        if (student) {
            await student.update(reqBody);
            res.status(200).send(student);
        } else res.status(404).send('Student not found!');
    } catch (err) {
        next(err);
    }
};

export const deleteById = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        const id = req.params.id;

        const student = await Student.findByPk(id);

        if (student) {
            await student.destroy();
            res.status(200).send(`Student with id ${id} deleted successfully!`);
        } else res.status(404).send('Student not found!');
    } catch (err) {
        next(err);
    }
};

export const login = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body;
        const student = await Student.findOne({ where: { email } });

        if (student) {
            const isPasswordValid = await student.checkPassword(password);
            if (isPasswordValid) res.status(200).send(student);
            else res.status(401).send('Invalid password!');
        } else res.status(404).send('Student not found!');
    } catch (err) {
        next(err);
    }
};

export const getExtratoAluno = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        const { idAluno } = req.params;

        const student = await Student.findByPk(idAluno);
        if (!student) {
            res.status(404).send('Student not found.');
            return;
        }

        const transacoes = await Transaction.findAll({
            where: {
                idDestinatario: idAluno,
                tipoDestinatario: 'Student'
            },
            order: [['dataHora', 'DESC']]
        });
        res.status(200).send({ balance: student.balance, transacoes });
    } catch (err) {
        next(err);
    }
};
