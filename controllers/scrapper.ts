import {Request, Response} from 'express';
import {scrapperAnimeEpisodeData} from '../services/main';

/**
 * Scrapper
 * @param req
 * @param res
 */
export const getAnimeEpisode = async (req: Request, res: Response) => {
  try {
    const episode: string = req.params.id;
    const data = await scrapperAnimeEpisodeData(episode);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Error al obtener los datos del anime'});
  }
};
