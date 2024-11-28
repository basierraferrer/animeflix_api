# Animeflix API

This is a custom API for AnimeFLV to watch anime.

## Get started

1. Config node version

   ```bash
   nvm use
   ```

2. Install dependencies

   ```bash
   yarn clean:install
   ```

3. Start the API

   ```bash
    yarn dev
   ```

4. Check `http://localhost:3100`;

## DB conection

[Read more](./docs/DB.md)

## Endpoints de la API

- Animes:

  - _`GET`_ /animes: Obtiene todos los animes.
  - _`POST`_ /animes: Añade un nuevo anime.
  - _`GET`_ /animes/`:id` Obtiene un anime por ID.
  - _`GET`_ /animes/`:name` Obtiene un anime por NOMBRE.
  - _`PUT`_ /animes/`:id` Actualiza un anime.
  - _`DELETE`_ /animes/`:id` Elimina un anime especifico.

- Episodios:

  - _`GET`_ /animes/`[:name]`|`[:id]`/episodes: Obtiene todos los episodios de un anime.
  - _`POST`_ /animes/`[:name]`|`[:id]`/episodes: Añade un episodio a un anime.
  - _`GET`_ /animes/`[:name]`|`[:id]`/episodes/`[:id]`: Obtiene un episodio específico de un anime.
  - _`PUT`_ /animes/`[:name]`|`[:id]`/episodes/`[:id]`: Actualiza un episodio.
  - _`DELETE`_ /animes/`[:name]`|`[:id]`/episodes/`[:id]`: Elimina un episodio.
