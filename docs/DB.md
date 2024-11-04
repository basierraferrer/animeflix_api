# Mongo Local con docker

Podemos ejecutar mongo y tenes una version de la base de datos de forma local para que se puedan hacer pruebas inciales,
la idea es que finalmente podamos hacer la conexion usando mongo ATLAS. Pero para avanzar en nuetsros features podemos hacerlo de forma local.

## Getting started

Cómo prerequisitos se debe instalar

- [docker](https://docs.docker.com/get-started/get-docker/)
- mongosh

### Install mongosh

Para windows

1. Abrir [MongoDB Download Center](https://www.mongodb.com/try/download/shell).
2. En el liustado de platform, seleccionar _Windows 64-bit (8.1+) (MSI)_
3. Click en **Download**
4. Doble click en el instalador
5. Seguir los pasos para instalar mongosh

Para Mac

1. Instalar [Homebrew](https://brew.sh/)
2. Instalar `mongosh`

```bash
brew install mongosh
```

Para Linux
Seguir el procedimeinto que encuentra en la sección Procedure tab Linux en la [documentación oficial](https://www.mongodb.com/docs/mongodb-shell/install/) de mongo

### Docker Image

Una vez instalado docker y mongosh

1. Descargar imagen docker de mongo

```bash
docker pull mongodb/mongodb-community-server:latest
```

2. Ejecutar la imagen descargada como Container

```bash
docker run --name mongodb -p 27017:27017 -d mongodb/mongodb-community-server:latest
```

3. Validar que el Container esta funcionando

```bash
docker container ls
```

en la terminal debe verse algo asi

| CONTAINER ID | IMAGE                                   | COMMAND                                 | ... | NAMES   |
| :----------- | :-------------------------------------- | :-------------------------------------- | :-- | :------ |
| e1e45c04785c | mongodb/mongodb-community-server:latest | "python3 /usr/local/…" (depende del SO) | ... | mongodb |

### Connect with VS CODE

En la lista de extensiones recomendadas del proyecto está [mongodb-vscode](https://marketplace.visualstudio.com/items?itemName=mongodb.mongodb-vscode)
el cual nos va permitir conectarnos a nuestra db localmente.

1. Una vez instalado debes ver el icono de MongoDb en el menu bar de VS code.
2. Selecciona MongoDB y debes ver las opciones
3. Selecciona **Add conection**
4. Ahora selecciona **Connect with Connection String** y agregas el string
   `mongodb://127.0.0.1:27017`
5. Si todo va bien debes ver algo como esto

   ![Mongo Conectado](./assets/mongo.png)

### Seed

#### PLAYGROUND VS code

Una vez se tenga la conexion ejecutaremos el seed para crear la DB localmente para eso ejecutaremos el playground

1. En la seccion de _PLAYGROUNDS_ en MongoDB view (justo debajo de la conexion) da click al boton refresh 🔄
2. Ya podrias ver el archivo `seed.mongodb.js` en la lista
3. Una vez abierto `seed.mongodb.js` en la esquina superior derecha da click al icono ▶️
4. Esto nos creará la db `animeflix` con el userdb `dev_1`y como password `Kireti2024`.
5. Crea un archivo `.env`usando el `.env.template` y reemplaza el valor de DB_URI

```text
mongodb://dev_1:Kireti2024@127.0.0.1:27017/
```

#### Initial data

Una vez se ejecuté el _PLAYGROUND_ ya tendriamos nuestra db creada ahora procedemos a crear algo de data, para ello debes ejecutar el script `yarn seed`. Una vez finalice deberias ver algo como esto:

```bash
$ npx ts-node config/seed
connectDB, Connected to MongoDB
Anime insertado: { ... }
Episodio insertado: { ... }
Usuario insertado: { ... }
Seeding completado con éxito
```

Para ver la data en MongoDB View en la seccion de _CONNECTIONS_ en donde aparece tu conexion local das click derecho y seleccione la opción refresh 🔄 y en cada coleccion deberias ver el documento insertado con el seed.

Ya con esto puedes empezar a trabajar en tu local.
