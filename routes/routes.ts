import {ScrapingController} from '../controllers';

import express from 'express';

const routes = express.Router();

routes.get('/:id', ScrapingController.getAnimeEpisode);

export {routes};
