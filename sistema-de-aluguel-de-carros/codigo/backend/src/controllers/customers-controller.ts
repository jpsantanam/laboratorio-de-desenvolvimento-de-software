import express from 'express';
import Customer from '../models/customer';
import Rent from '../models/rent';
import Vehicle from '../models/vehicle';

// Get customer by id
export const getById = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        const id = req.params.id;
        const customer = await Customer.findByPk(id, {
            include: [
                {
                    model: Rent,
                    include: [
                        {
                            model: Vehicle, // This will fetch the rented vehicles
                        },
                    ],
                },
            ],
        });

        if (customer) res.status(200).send(customer);
        else res.status(404).send('Customer not found!');
    } catch (err) {
        next(err);
    }
};

// Get all customers
export const getAll = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        const customers = await Customer.findAll({
            include: [
                {
                    model: Rent,
                    include: [
                        {
                            model: Vehicle, // This will fetch the rented vehicles
                        },
                    ],
                },
            ],
        });

        res.status(200).send(customers);
    } catch (err) {
        next(err);
    }
};

// Create customer
export const create = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        const reqBody = req.body as Customer;
        const customer = await Customer.create(reqBody);

        res.status(201).send(customer);
    } catch (err) {
        next(err);
    }
};

// Update customer
export const update = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        const id = req.params.id;
        const reqBody = req.body as Customer;

        const customer = await Customer.findByPk(id);

        if (customer) {
            await customer.update(reqBody);
            res.status(200).send(customer);
        } else {
            res.status(404).send('Customer not found!');
        }
    } catch (err) {
        next(err);
    }
};

// Delete customer
export const deleteById = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        const id = req.params.id;

        const customer = await Customer.findByPk(id);

        if (customer) {
            await customer.destroy();
            res.status(200).send(`Customer with id ${id} deleted successfully!`);
        } else {
            res.status(404).send('Customer not found!');
        }
    } catch (err) {
        next(err);
    }
};

// Login customer
export const login = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body;
        const customer = await Customer.findOne({ where: { email } });

        if (customer) {
            const isPasswordValid = await customer.checkPassword(password);
            if (isPasswordValid) {
                res.status(200).send(customer);
            } else {
                res.status(401).send('Invalid password!');
            }
        } else {
            res.status(404).send('Customer not found!');
        }
    } catch (err) {
        next(err);
    }
};
