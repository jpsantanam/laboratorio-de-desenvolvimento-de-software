import { Router } from 'express';
import { create, get, getByEmpresa } from '../controllers/vantagem-controller';

const vantagemRouter = Router();

vantagemRouter.route('/')
    .post(create)
    .get(get);

vantagemRouter.route('/empresa/:idEmpresa')
    .get(getByEmpresa);

export default vantagemRouter;
