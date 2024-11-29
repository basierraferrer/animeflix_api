import {Request, Response} from 'express';
import {episodeService} from '../services';
import {REGEX_EPISODE} from '../utils';
/**
 * Get all Anime's episode by anime id
 * @param req
 * @param res
 */
const getAllEpisodesByAnimeId = async (req: Request, res: Response) => {
  try {
    const animeId = req.params.animeId;
    const data = await episodeService.getEpisodesByAnimeId(animeId);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Error al obtener los episodios del anime'});
  }
};

const getAnimeEpisode = async (req: Request, res: Response) => {
  try {
    const animeId = req.params.animeId;
    const episode = req.params.episode;

    if (!episode.match(REGEX_EPISODE)) {
      res.status(400).json({error: 'El episodio debe ser un número'});
    }

    const savedEpisode = await episodeService.getEpisodeByAnimeId(
      animeId,
      episode,
    );

    if (!savedEpisode) {
      const scrapeEpisode = await episodeService.getEpisodeScrapper(
        animeId,
        episode,
      );

      if (!scrapeEpisode) {
        res.status(500).json({error: 'Error al obetener episodio'});
      }

      res.json(scrapeEpisode);
    }

    res.json(savedEpisode);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Error al obetener episodio'});
  }
};

const insertEpisode = async (req: Request, res: Response) => {
  try {
    const animeId = req.params.animeId;
    const episodeData = req.body;
    const savedEpisode = await episodeService.addNewEpisode(
      animeId,
      episodeData,
      true,
    );
    res
      .status(201)
      .json({message: 'Episodio creado con éxito.', data: savedEpisode});
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Error al insertar episodio'});
  }
};

export default {
  getAllEpisodesByAnimeId,
  getAnimeEpisode,
  insertEpisode,
};
