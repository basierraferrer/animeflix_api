import mongoose, {Types} from 'mongoose';
import connectDB from '../config/connection';
import {Anime, Episode} from '../models';
import {scrapperService} from '../services';
import {EpisodeProps} from '../types';

/**
 * Service that try to find the Anime's episode filtering by animeId
 * @param animeIdParam Id value of the anime
 * @returns Anime's episodes available
 */
const getEpisodesByAnimeId = async (animeIdParam: string) => {
  console.log(
    '🚀 ~ getEpisodesByAnimeId ~ start getEpisodesByAnimeId ',
    animeIdParam,
  );
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
    console.log('🚀 ~ getEpisodesByAnimeId ~ end getEpisodesByAnimeId ');
  }
};

const getEpisodeByAnimeId = async (animeIdParam: string, episode: string) => {
  console.log(
    '🚀 ~ getEpisodesByAnimeId ~ start getEpisodeByAnimeId ',
    animeIdParam,
    episode,
  );
  await connectDB();
  try {
    // Convertir el animeId a ObjectId
    const animeId = new Types.ObjectId(animeIdParam);
    // Buscar episodios por animeId y episode
    const savedEpisode = await Episode.findOne({animeId, episode});
    console.log('Episodio encontrado:', savedEpisode);
    return savedEpisode;
  } catch (error) {
    console.error('Error al obtener episodios:', error);
    return undefined;
  } finally {
    mongoose.connection.close();
    console.log('🚀 ~ getEpisodesByAnimeId ~ end getEpisodeByAnimeId ');
  }
};

const getEpisodeScrapper = async (animeIdParam: string, episode: string) => {
  console.log(
    '🚀 ~ getEpisodesByAnimeId ~ start getEpisodeScrapper ',
    animeIdParam,
    episode,
  );
  await connectDB();
  try {
    // Convertir el animeId a ObjectId
    const animeId = new Types.ObjectId(animeIdParam);
    // Buscar episodios por animeId y episode
    const savedAnime = await Anime.findById(animeId);

    if (!savedAnime) {
      throw new Error('Anime no encontrado');
    }

    // Obtenemos title
    const animeName = savedAnime.title.replace(' ', '-').toLowerCase();
    console.log('Anime encontrado:', animeName);

    const scrapeEpisode = await scrapperService.scrapperEpisodeAnime(
      episode,
      animeName,
    );
    console.log('Episodio scrapeado:', scrapeEpisode);

    const savedEpisode = await addNewEpisode(
      animeIdParam,
      scrapeEpisode,
      false,
    );
    return savedEpisode;
  } catch (error) {
    console.error('Error al obtener episodios:', error);
    return undefined;
  } finally {
    mongoose.connection.close();
    console.log('🚀 ~ getEpisodesByAnimeId ~ end getEpisodeScrapper ');
  }
};

const addNewEpisode = async (
  animeIdParam: string,
  episodeData: EpisodeProps,
  shouldConnect: boolean,
) => {
  console.log(
    '🚀 ~ getEpisodesByAnimeId ~ start addNewEpisode ',
    animeIdParam,
    episodeData,
  );
  shouldConnect && (await connectDB());
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
    shouldConnect && mongoose.connection.close();
    console.log('🚀 ~ getEpisodesByAnimeId ~ end addNewEpisode ');
  }
};

export default {
  getEpisodeByAnimeId,
  getEpisodesByAnimeId,
  getEpisodeScrapper,
  addNewEpisode,
};
