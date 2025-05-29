import { Router } from 'express';
import {
    create,
    getAll,
    getById,
    update,
    deleteById,
    enviarMoedas,
    getExtratoProfessor,
    login
} from '../controllers/professor-controller';

const professorRouter = Router();

professorRouter.route('/')
    .post(create)
    .get(getAll);

professorRouter.route('/:id')
    .get(getById)
    .put(update)
    .delete(deleteById);

professorRouter.route('/login')
    .post(login);

professorRouter.route('/:idProfessor/extrato')
    .get(getExtratoProfessor);

professorRouter.route('/enviar-moedas',)
    .post(enviarMoedas);

export default professorRouter;
