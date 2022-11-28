import express from 'express';

import task from './task.js';
import report from './report.js';
import signature from './signature.js';
import country from './country.js';
import orderType from './orderType.js';
import user from './user.js';


const routes = express.Router();
routes.use('/task', checkAuth, task);
routes.use('/report', checkAuth, report);
routes.use('/signature', checkAuth, signature);
routes.use('/country', checkAuth, country)
routes.use('/type', checkAuth,orderType)
routes.use('/user', checkAuth, user)
routes.use('/', login)

export default routes;