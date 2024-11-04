import mongoose, {Types} from 'mongoose';
import connectDB from '../config/connection';
import Episode from '../models/Episode';

/**
 * Service that try to find the Anime's episode filtering by animeId
 * @param animeIdParam Id value of the anime
 * @returns Anime's episodes available
 */
const getEpisodesByAnimeId = async (animeIdParam: string) => {
  await connectDB();
  try {
    // Convertir el animeId a ObjectId
    const animeId = new Types.ObjectId(animeIdParam);
    // Buscar episodios por animeId
    const episodes = await Episode.find({animeId});
    console.log('Episodios encontrados:', episodes);
    return episodes;
  } catch (error) {
    console.error('Error al obtener episodios:', error);
    return [];
  } finally {
    mongoose.connection.close();
  }
};

export default {
  getEpisodesByAnimeId,
};
