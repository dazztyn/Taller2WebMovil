import pg from 'pg';
import 'dotenv/config';

const { Client } = pg;

const con = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

/*funcion de testeo para insertar una serie

async function insertarSerie() {
  const query = `
    INSERT INTO series (idSerie, titulo, lenguaje, genero, estreno, rating, imagen)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
  `;
  const values = [1, 'Breaking Bad', 'English', 'Drama', '2008-01-20', 9.5, 'https://image.url'];
  await con.query(query, values);
  console.log("Serie agregada correctamente");
}

*/

con.connect()
.then(() => console.log('Connected to database'))
.then(() => console.log("Connected to:", process.env.DB_NAME))
.catch(err => console.error('Connection error', err.stack));

export default con;