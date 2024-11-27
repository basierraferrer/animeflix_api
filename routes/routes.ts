import express from 'express';
import {episodesRoutes} from './episodesRoutes';
import {scrapperRoutes} from './scrapEpisodeRoute';

const routes = express.Router();

routes.use('/animes', episodesRoutes);
routes.use('/scraping', scrapperRoutes);

export {routes};
