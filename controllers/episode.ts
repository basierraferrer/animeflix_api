import {Request, Response} from 'express';
import episodeService from '../services/episodes';
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

const insertEpisode = async (req: Request, res: Response) => {
  try {
    const animeId = req.params.animeId;
    const episodeData = req.body;
    const savedEpisode = await episodeService.addNewEpisode(
      animeId,
      episodeData,
    );
    res
      .status(201)
      .json({message: 'Episodio creado con éxito.', episode: savedEpisode});
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Error al insertar episodio'});
  }
};

export default {
  getAllEpisodesByAnimeId,
  insertEpisode,
};
