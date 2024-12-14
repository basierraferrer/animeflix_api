import {EpisodeController} from '../controllers';

import express from 'express';

const episodeRoutes = express.Router();

episodeRoutes.get(
  '/:animeId/episodes',
  EpisodeController.getAllEpisodesByAnimeId,
);

export {episodeRoutes};
