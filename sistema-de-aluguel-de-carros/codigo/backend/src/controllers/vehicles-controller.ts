import express from 'express';
import Vehicle from '../models/vehicle';

// Get vehicle by id
export const getById = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        const id = req.params.id;
        const vehicle = await Vehicle.findByPk(id);

        if (vehicle) res.status(200).send(vehicle);
        else res.status(404).send('Vehicle not found!');
    } catch (err) {
        next(err);
    }
};

// Get all vehicles
export const getAll = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        const vehicles = await Vehicle.findAll();

        res.status(200).send(vehicles);
    } catch (err) {
        next(err);
    }
};

// Create vehicle
export const create = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        const reqBody = req.body as Vehicle;
        const vehicle = await Vehicle.create(reqBody);

        res.status(201).send(vehicle);
    } catch (err) {
        next(err);
    }
};

// Update vehicle
export const update = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        const id = req.params.id;
        const reqBody = req.body as Vehicle;

        const vehicle = await Vehicle.findByPk(id);

        if (vehicle) {
            await vehicle.update(reqBody);
            res.status(200).send(vehicle);
        } else {
            res.status(404).send('Vehicle not found!');
        }
    } catch (err) {
        next(err);
    }
};

// Delete vehicle
export const deleteById = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        const id = req.params.id;

        const vehicle = await Vehicle.findByPk(id);

        if (vehicle) {
            await vehicle.destroy();
            res.status(200).send(`Vehicle with id ${id} deleted successfully!`);
        } else {
            res.status(404).send('Vehicle not found!');
        }
    } catch (err) {
        next(err);
    }
};
