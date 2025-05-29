import { Router } from 'express';
import { create, getByAluno } from '../controllers/redemption-controller';

const redemptionRouter = Router();

redemptionRouter.route('/')
    .post(create);

redemptionRouter.route('/aluno/:idAluno')
    .get(getByAluno);

export default redemptionRouter;
