import express from 'express';
import episodeController from '../controllers/episode';

const episodesRoutes = express.Router();

episodesRoutes.get(
  '/:animeId/episodes',
  episodeController.getAllEpisodesByAnimeId,
);

episodesRoutes.post('/:animeId/episodes', episodeController.insertEpisode);

export {episodesRoutes};
