import express from 'express';
import Rent from '../models/rent';

// Get rent by id
export const getById = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        const id = req.params.id;
        const rent = await Rent.findByPk(id);

        if (rent) res.status(200).send(rent);
        else res.status(404).send('Rent not found!');
    } catch (err) {
        next(err);
    }
};

// Get all rents
export const getAll = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        const rents = await Rent.findAll();

        res.status(200).send(rents);
    } catch (err) {
        next(err);
    }
};

// Create rent
export const create = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        const reqBody = req.body as Rent;
        reqBody.startDate = new Date();
        reqBody.endDate = new Date();
        const rent = await Rent.create(reqBody);

        res.status(201).send(rent);
    } catch (err) {
        next(err);
    }
};

// Update rent
export const update = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        const id = req.params.id;
        const reqBody = req.body as Rent;

        const rent = await Rent.findByPk(id);

        if (rent) {
            await rent.update(reqBody);
            res.status(200).send(rent);
        } else {
            res.status(404).send('Rent not found!');
        }
    } catch (err) {
        next(err);
    }
};

// Delete rent
export const deleteById = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        const id = req.params.id;

        const rent = await Rent.findByPk(id);

        if (rent) {
            await rent.destroy();
            res.status(200).send(`Rent with id ${id} deleted successfully!`);
        } else {
            res.status(404).send('Rent not found!');
        }
    } catch (err) {
        next(err);
    }
};
