import { Controller, Get, Post, Body } from '@nestjs/common';
import { PeliculasService } from './peliculas.service';
import { CreatePeliculaDto } from './dto/create-pelicula.dto'; 

@Controller('peliculas') // <-- Esto crea la ruta base /peliculas
export class PeliculasController { 
  constructor(private readonly peliculasService: PeliculasService) {} 

  @Post() // <-- POST /peliculas
  create(@Body() createPeliculaDto: CreatePeliculaDto) {
    return this.peliculasService.create(createPeliculaDto);
  }

  @Get() // <-- GET /peliculas
  findAll() {
    return this.peliculasService.findAll();
  }
}