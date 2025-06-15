import { Router } from 'express';
import {
    create,
    getAll,
    getById,
    update,
    deleteById
} from '../controllers/instituicaoEnsino-controller';

const instituicaoRouter = Router();

instituicaoRouter.route('/')
    .post(create)
    .get(getAll);

instituicaoRouter.route('/:id')
    .get(getById)
    .put(update)
    .delete(deleteById);

export default instituicaoRouter;