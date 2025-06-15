import express from 'express';
import Company from '../models/company';

// Get company by id
export const getById = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        const id = req.params.id;
        const company = await Company.findByPk(id);

        if (company) res.status(200).send(company);
        else res.status(404).send('Company not found!');
    } catch (err) {
        next(err);
    }
};

// Get all companies
export const getAll = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        const companies = await Company.findAll();

        res.status(200).send(companies);
    } catch (err) {
        next(err);
    }
};

// Create company
export const create = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        const reqBody = req.body as Company;
        const company = await Company.create(reqBody);

        res.status(201).send(company);
    } catch (err) {
        next(err);
    }
};

// Update company
export const update = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        const id = req.params.id;
        const reqBody = req.body as Company;

        const company = await Company.findByPk(id);

        if (company) {
            await company.update(reqBody);
            res.status(200).send(company);
        } else res.status(404).send('Company not found!');
    } catch (err) {
        next(err);
    }
};

// Delete company
export const deleteById = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        const id = req.params.id;

        const company = await Company.findByPk(id);

        if (company) {
            await company.destroy();
            res.status(200).send(`Company with id ${id} deleted successfully!`);
        } else res.status(404).send('Company not found!');
    } catch (err) {
        next(err);
    }
};

// Login company
export const login = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body;
        const company = await Company.findOne({ where: { email } });

        if (company) {
            const isPasswordValid = await company.checkPassword(password);
            if (isPasswordValid) res.status(200).send(company);
            else res.status(401).send('Invalid password!');
        } else res.status(404).send('Company not found!');
    } catch (err) {
        next(err);
    }
};