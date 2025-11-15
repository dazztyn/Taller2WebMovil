import express from 'express';
import {router as seriesRouter } from '../routes/series.routes.js';
import 'dotenv/config';

const app = express();
app.use(express.json());

app.use("/series", seriesRouter);

app.get('/', (req, res) => {
  res.send('Hola esta es la dazztynApi');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log("DB Config:", {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

});
//node index.js para correr el servidor