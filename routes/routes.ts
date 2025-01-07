import {scrapingRoutes} from './scraping';
import {episodeRoutes} from './episodes';

import express from 'express';

const routes = express.Router();

routes.use('/scraping', scrapingRoutes);
routes.use('/animes', episodeRoutes);

export {routes};
