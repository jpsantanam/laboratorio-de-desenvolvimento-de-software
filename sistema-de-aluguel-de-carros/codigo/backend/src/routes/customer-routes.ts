import { Router } from 'express';
const customerRouter = Router();

import { create, update, deleteById, getById, getAll, login } from '../controllers/customers-controller';

customerRouter.route('/')
    .post(create)
    .get(getAll);

customerRouter.route('/:id')
    .get(getById)
    .put(update)
    .delete(deleteById);

customerRouter.route('/login')
    .post(login);


export default customerRouter;