import { Client } from 'pg';

const con = new Client({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  password: 'dazztynbd',
  database: "dazztynDB"
});

//funcion de testeo para insertar una serie
async function insertarSerie() {
  const query = `
    INSERT INTO series (idSerie, titulo, lenguaje, genero, estreno, rating, imagen)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
  `;
  const values = [1, 'Breaking Bad', 'English', 'Drama', '2008-01-20', 9.5, 'https://image.url'];
  await con.query(query, values);
  console.log("Serie agregada correctamente");
}


con.connect()
.then(() => console.log('Connected to database'))
.then(() => insertarSerie())
.catch(err => console.error('Connection error', err.stack));

export default con;