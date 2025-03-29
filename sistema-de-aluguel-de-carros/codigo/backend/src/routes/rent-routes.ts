import { Router } from 'express';
import { create, update, deleteById, getById, getAll } from '../controllers/rents-controller';

const rentRouter = Router();

rentRouter.route('/')
    .post(create)
    .get(getAll);

rentRouter.route('/:id')
    .get(getById)
    .put(update)
    .delete(deleteById);

export default rentRouter;