import {Request, Response} from 'express';
import {scrapperService} from '../services';

/**
 * Scrapper
 * @param req
 * @param res
 */
const getAnimeEpisode = async (req: Request, res: Response) => {
  try {
    const episode: string = req.params.id;
    const data = await scrapperService.scrapperAnimeEpisodeData(episode);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Error al obtener los datos del anime'});
  }
};

export default {
  getAnimeEpisode,
};
