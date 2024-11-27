import express from 'express';
import scrapper from '../controllers/scrapper';

const scrapperRoutes = express.Router();

scrapperRoutes.get('/episode/:id', scrapper.getAnimeEpisode);

export {scrapperRoutes};
