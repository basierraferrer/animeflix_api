import express from 'express';
import episodeController from '../controllers/episode';

const episodesRoutes = express.Router();

// GET's
episodesRoutes.get(
  '/:animeId/episodes',
  episodeController.getAllEpisodesByAnimeId,
);

episodesRoutes.get(
  '/:animeId/episodes/:episode',
  episodeController.getAnimeEpisode,
);

// POST's

episodesRoutes.post('/:animeId/episodes', episodeController.insertEpisode);

export {episodesRoutes};
