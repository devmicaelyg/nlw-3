import { Router } from 'express';
import multer from 'multer';

import uploudConfig from './config/uploud';
import CasasrepousoController from './controllers/CasarepousoController';
const routes = Router();
const upload = multer(uploudConfig);

routes.get('/casasrepouso', CasasrepousoController.index)
routes.get('/casasrepouso/:id', CasasrepousoController.show)
routes.post('/casasrepouso', upload.array('images'), CasasrepousoController.create)

export default routes;