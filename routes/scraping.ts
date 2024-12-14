import {ScrapingController} from '../controllers';

import express from 'express';

const scrapingRoutes = express.Router();

scrapingRoutes.get('/:id', ScrapingController.getAnimeEpisode);

export {scrapingRoutes};
