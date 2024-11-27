import mongoose from 'mongoose';
import connectDB from '../connection';
import {Anime, Episode, User} from '../../models';

// Función para ejecutar el seed
const seedDatabase = async () => {
  await connectDB();

  try {
    // se limpia la db
    await Anime.deleteMany({});
    await Episode.deleteMany({});
    await User.deleteMany({});
    // Definir los datos de seed
    const animeData = {
      title: 'Detective Conan',
      synopsis:
        'Shinichi Kudo es un gran detective juvenil que ayuda a la policía a resolver muchos casos, sus grandes capacidades de deducción le ayudan a resolver los más complicados casos criminales, pero cuando se cruza en el camino de cierta organización, le administran una droga experimental que lo convierte en un niño, así que no tiene más remedio que adoptar la identidad de Conan Edogawa e intentar encontrar a los responsables para volver a la normalidad.',
      releaseDate: new Date('1996-01-08T00:00:00.000Z'),
      rating: 8.5,
      genre: [
        'Shōnen',
        'Action',
        'Comedy',
        'Crime',
        'Drama',
        'Mystery',
        'Romance',
        'Sci-Fi',
      ],
    };

    // Insertar anime
    const anime = await Anime.create(animeData);
    console.log('Anime insertado:', anime);

    const episodeData = {
      episode: 1,
      playerUrl: 'https://streamwish.to/e/ufaelhbdihh4',
      duration: 1440000,
      scrapeDate: new Date(),
      animeId: new mongoose.Types.ObjectId(), // Placeholder, se actualizará más adelante
    };

    // Insertar episodio relacionado con el ID del anime insertado
    episodeData.animeId = anime._id;

    const episode = await Episode.create(episodeData);
    console.log('Episodio insertado:', episode);

    const userData = {
      username: 'Kireti',
      email: 'brialx.40@gmail.com',
      passwordHash: 'pass_123_2024$.',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    // Insertar usuario
    const user = await User.create(userData);
    console.log('Usuario insertado:', user);

    console.log('Seeding completado con éxito');
  } catch (error) {
    console.error('Error durante el seeding:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
