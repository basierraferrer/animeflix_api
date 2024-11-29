import express from 'express';
import cors from 'cors';
import {routes} from './routes/routes';

const app = express();

app.use(cors());

// Rutas
app.use('/api', routes);

// Puerto de escucha
const port = process.env.PORT || 3100;

app.listen(port, () => {
  console.log(`Servidor Node.js escuchando en el puerto ${port}`);
});

export default app;
