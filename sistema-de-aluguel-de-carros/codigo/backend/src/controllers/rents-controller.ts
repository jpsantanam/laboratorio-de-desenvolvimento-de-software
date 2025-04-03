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

// Get rents by vehicleId and customerId
export const getByVehicleAndCustomer = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        const { vehicleId, customerId } = req.query;

        if (!vehicleId || !customerId) {
            res.status(400).send('vehicleId and customerId are required!');
            return;
        }

        const rents = await Rent.findAll({
            where: {
                vehicleId: vehicleId as string,
                customerId: customerId as string,
            },
        });

        if (rents.length > 0) res.status(200).send(rents);
        else res.status(404).send('No rents found for the given vehicleId and customerId!');
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
