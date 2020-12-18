/**
 * User Routes
 */

import { Router } from 'express';

import * as GetController from '../controllers/get.controller';

const routes = new Router();

routes.get('/currency/convert', GetController.converter);

export default routes;
