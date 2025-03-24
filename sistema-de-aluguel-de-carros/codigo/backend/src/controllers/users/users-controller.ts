import express from 'express';
import bcrypt from 'bcrypt';
import User from '../../models/user';
import { PostUserDTO, UpdateUserDTO, UserResponseDTO, GetUsersParamsDTO, UserLoginDTO } from './dtos';

// Get user by id
export const getById = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<void> => {
    try {
        const id = req.params.id;

        // Search user by id
        const user = await User.findByPk(id);

        if (user) res.status(200).send(user as UserResponseDTO);
        else res.status(404).send('User not found!');
    } catch (err) {
        next(err);
    }
}

// Get users
export const get = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<void> => {
    try {
        const reqParams = req.query as GetUsersParamsDTO;
        let { search, startDate, endDate, role } = reqParams;

        const users = await User.findAll();

        if (search) {
            search = (search as string).toLowerCase();
            users.filter(user => {
                const values = Object.values(user.toJSON());
                return values.some(value => {
                    const stringValue = value ? value.toString().toLowerCase() : '';
                    return stringValue.includes(search);
                });
            });
        }
        if (startDate) users.filter(user => user.createdAt >= new Date(startDate as string));
        if (endDate) users.filter(user => user.createdAt <= new Date(endDate as string));
        if (role) users.filter(user => user.role === role);

        if (users.length === 0) res.status(404).send('No users found with the provided parameters.');
        else res.status(200).send(users as UserResponseDTO[]);

    } catch (err) {
        next(err);
    }
}

// Create user
export const create = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<void> => {
    try {
        const reqBody = req.body as PostUserDTO;

        const saltRounds = 10;
        reqBody.password = await bcrypt.hash(reqBody.password, saltRounds);

        const newUser = {
            ...reqBody,
            createdAt: new Date()
        };

        const user = await User.create(newUser);
        res.status(200).send(user as UserResponseDTO);

    } catch (err) {
        if (err instanceof Error && err.name === 'SequelizeUniqueConstraintError') res.status(400).send('User with provided info already exists!');
        else next(err);
    }
};

// Update user
export const updateById = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<void> => {
    try {
        const id = req.params.id;
        const reqBody = req.body as UpdateUserDTO;

        // Search user by id
        let user = await User.findByPk(id);
        if (!user) res.status(404).send('User not found!');

        if (reqBody.password) {
            const saltRounds = 10;
            reqBody.password = await bcrypt.hash(reqBody.password, saltRounds);
        }

        // Apply updates
        if (user) {
            user = await user.update(reqBody);

            res.status(200).json({
                message: 'User updated successfully!',
                user: user as UserResponseDTO
            });
        } else res.status(404).send('User not found!');

    } catch (error) {
        next(error);
    }
};

// Delete user
export const deleteById = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<void> => {
    try {
        const id = req.params.id;

        // Search user by id
        const user = await User.findByPk(id);
        if (user) {
            await user.destroy();

            res.status(200).send(`User with id ${id} deleted successfully!`);
        } else res.status(404).send('User not found!');

    } catch (err) {
        next(err);
    }
}

// Login
export const login = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<void> => {
    const reqBody = req.body as UserLoginDTO;
    try {
        const user = await User.findOne({ where: { email: reqBody.email } });
        if (!user) res.status(404).send('User not found!');
        else {
            const isPasswordValid = await bcrypt.compare(reqBody.password, user.password);

            if (!isPasswordValid) res.status(401).send('Incorrect password!');
            else res.status(200).send(user as UserResponseDTO);
        }

    } catch (err) {
        next(err);
    }
};