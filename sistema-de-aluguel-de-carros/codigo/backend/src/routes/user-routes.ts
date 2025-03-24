import { Router } from 'express';
const userRouter = Router();

import { create, updateById, deleteById, getById, get, login } from '../controllers/users/users-controller';

userRouter.route('/')
    .post(create)
    .get(get);

userRouter.route('/:id')
    .get(getById)
    .put(updateById)
    .delete(deleteById);

userRouter.route('/login')
    .post(login);

export default userRouter;