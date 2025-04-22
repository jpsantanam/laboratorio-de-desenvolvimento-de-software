import { Router } from 'express';
const studentRouter = Router();

import { create, update, deleteById, getById, getAll, login } from '../controllers/student-controller';

studentRouter.route('/')
    .post(create)
    .get(getAll);

studentRouter.route('/:id')
    .get(getById)
    .put(update)
    .delete(deleteById);

studentRouter.route('/login')
    .post(login);

export default studentRouter;