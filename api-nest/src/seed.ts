/* eslint-disable no-console */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Pelicula, PeliculaDocument } from './peliculas/schemas/pelicula.schema';
import { Model } from 'mongoose';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  console.log('Iniciando seeder...');
  
  // 1. Iniciar la aplicación de Nest (pero solo el contexto, no el servidor)
  const app = await NestFactory.createApplicationContext(AppModule);

  // 2. Obtener el "Modelo" de Pelicula que está conectado a la base de datos
  const peliculaModel = app.get<Model<PeliculaDocument>>(
    getModelToken(Pelicula.name),
  );

  // 3. Leer el archivo JSON
  // path.join(__dirname, '..', 'peliculas.json') busca el archivo en la raíz (sube un nivel desde 'src')
  const jsonPath = path.join(__dirname, '..', 'peliculas.json');
  let peliculas = [];
  try {
    const jsonString = fs.readFileSync(jsonPath, 'utf8');
    peliculas = JSON.parse(jsonString);
    console.log(`Leídas ${peliculas.length} películas del archivo.`);
  } catch (err) {
    console.error('Error leyendo el archivo peliculas.json:', err);
    await app.close();
    return;
  }

  // 4. (Opcional) Borrar todos los datos existentes
  try {
    console.log('Limpiando la colección de películas...');
    await peliculaModel.deleteMany({});
    console.log('Colección limpiada.');
  } catch (err) {
    console.error('Error limpiando la colección:', err);
  }

  // 5. Insertar todas las películas del JSON
  try {
    console.log('Insertando nuevas películas...');
    await peliculaModel.insertMany(peliculas);
    console.log('¡Todas las películas fueron insertadas en MongoDB!');
  } catch (err) {
    console.error('Error insertando las películas:', err);
  }

  // 6. Cerrar la conexión
  await app.close();
  console.log('Seeder finalizado.');
}

// Ejecutar la función
bootstrap();