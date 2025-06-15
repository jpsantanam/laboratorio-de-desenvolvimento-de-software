import { Router } from 'express';
const studentRouter = Router();

import { create, update, deleteById, getById, getAll, login, getExtratoAluno } from '../controllers/student-controller';

studentRouter.route('/')
    .post(create)
    .get(getAll);

studentRouter.route('/:id')
    .get(getById)
    .put(update)
    .delete(deleteById);

studentRouter.route('/login')
    .post(login);

studentRouter.route('/:idAluno/extrato')
    .get(getExtratoAluno);

export default studentRouter;