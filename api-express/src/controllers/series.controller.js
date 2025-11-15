import db from '../db.js';
import fs from 'fs';

export const fetchSeries = async (req, res) => {
  try 
  {
    const result = await db.query('SELECT * FROM series');
    res.json(result.rows);
  } 
  catch (error) 
  {
    console.error('Error obteniendo series', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const cargarSeriesJson = async  (req, res) => {
  try {
    const data = fs.readFileSync('./data/series.json', 'utf8');
    const series = JSON.parse(data);

    for (const serie of series) {
      await db.query(
        `INSERT INTO series (idserie, titulo, lenguaje, genero, estreno, rating, imagen)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         ON CONFLICT DO NOTHING`,
        [serie.idserie, serie.titulo, serie.lenguaje, serie.genero, serie.estreno, serie.rating, serie.imagen]
      );
    }

    res.json({ message: `${series.length} Series cargadas exitosamente` });
  } catch (error) {
    console.error('Error cargando series desde JSON', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};