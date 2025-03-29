import { Router } from 'express';
const vehicleRouter = Router();

import { create, update, deleteById, getById, getAll } from '../controllers/vehicles-controller';

vehicleRouter.route('/')
    .post(create)
    .get(getAll);

vehicleRouter.route('/:id')
    .get(getById)
    .put(update)
    .delete(deleteById);


export default vehicleRouter;