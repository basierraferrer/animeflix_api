import mongoose, {Types} from 'mongoose';
import connectDB from '../config/connection';
import Episode from '../models/Episode';
import {Anime} from '../models';

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

interface EpisodeData {
  episode: number;
  playerUrl: string;
  duration: number;
}

const addNewEpisode = async (
  animeIdParam: string,
  episodeData: EpisodeData,
) => {
  await connectDB();
  try {
    // Convertir el animeId a ObjectId
    const animeId = new Types.ObjectId(animeIdParam);
    const animeExists = await Anime.findById(animeId);
    // Verificar si el anime existe
    if (!animeExists) {
      throw new Error("'El anime no existe.'");
    }
    // Crear un nuevo episodio
    const newEpisode = new Episode({
      ...episodeData,
      scrapeDate: new Date(),
      animeId,
    });

    // Guardar el episodio en la base de datos
    const savedEpisode = await newEpisode.save();
    return savedEpisode;
  } catch (error) {
    console.error('Error al obtener episodios:', error);
    return null;
  } finally {
    mongoose.connection.close();
  }
};

export default {
  getEpisodesByAnimeId,
  addNewEpisode,
};
