import express from 'express';
import episodeController from '../controllers/episode';

const episodesRoutes = express.Router();

// scrapper method
episodesRoutes.get('/:animeId', episodeController.getAllEpisodesByAnimeId);

export {episodesRoutes};
