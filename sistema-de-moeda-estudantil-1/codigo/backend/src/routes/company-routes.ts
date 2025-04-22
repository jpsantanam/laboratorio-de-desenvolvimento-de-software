import { Router } from 'express';
const companyRouter = Router();

import { create, update, deleteById, getById, getAll, login } from '../controllers/company-controller';

companyRouter.route('/')
    .post(create)
    .get(getAll);

companyRouter.route('/:id')
    .get(getById)
    .put(update)
    .delete(deleteById);

companyRouter.route('/login')
    .post(login);

export default companyRouter;