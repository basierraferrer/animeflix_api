import express from 'express';
import {episodesRoutes} from './episodesRoutes';

const routes = express.Router();

routes.use('/episodes', episodesRoutes);

export {routes};
