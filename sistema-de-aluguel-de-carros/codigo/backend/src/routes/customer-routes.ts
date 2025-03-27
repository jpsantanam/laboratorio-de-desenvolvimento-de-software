import { Router } from 'express';
const customerRouter = Router();

import { create, update, deleteById, getById, getAll } from '../controllers/customers/customers-controller';

customerRouter.route('/')
    .post(create)
    .get(getAll);

customerRouter.route('/:id')
    .get(getById)
    .put(update)
    .delete(deleteById);

export default customerRouter;