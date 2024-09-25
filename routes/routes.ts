import {getAnimeEpisode} from '../controllers/controller'

import express from "express";

const routes = express.Router();


routes.get('/:id', getAnimeEpisode);

export {routes}