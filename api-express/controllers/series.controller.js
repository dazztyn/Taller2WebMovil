import db from './db.js';
import axios from 'axios';

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

export const agregarSerie = async (req, res) => {
  const { idserie, titulo, lenguaje, genero, estreno, rating, imagen } = req.body;
  try {
    const query = `
      INSERT INTO series (idserie, titulo, lenguaje, genero, estreno, rating, imagen)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    await db.query(query, [idserie, titulo, lenguaje, genero, estreno, rating, imagen]);
    res.json({ message: "Serie agregada correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};