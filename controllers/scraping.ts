import {Request, Response} from 'express';
import {ScrapperServices} from '../services';

const getAnimeEpisode = async (req: Request, res: Response): Promise<void> => {
  try {
    const episode: string = req.params.id;
    const data = await ScrapperServices.scrapperAnimeEpisodeData(episode);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Error al obtener los datos del anime'});
  }
};

export default {
  getAnimeEpisode,
};
