import express from 'express';
import {router as seriesRouter } from '../routes/series.routes.js';

const app = express();
app.use(express.json());

app.use("/series", seriesRouter);

app.get('/', (req, res) => {
  res.send('Hola esta es la dazztynApi');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
//node index.js para correr el servidor