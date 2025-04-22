import express from 'express';
import Student from '../models/student';

// Get student by id
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

// Get all students
export const getAll = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        const students = await Student.findAll();

        res.status(200).send(students);
    } catch (err) {
        next(err);
    }
};

// Create student
export const create = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        const reqBody = req.body as Student;
        const student = await Student.create(reqBody);

        res.status(201).send(student);
    } catch (err) {
        next(err);
    }
};

// Update student
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

// Delete student
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

// Login student
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