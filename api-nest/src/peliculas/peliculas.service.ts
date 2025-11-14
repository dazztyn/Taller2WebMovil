import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pelicula, PeliculaDocument } from './schemas/pelicula.schema';
import { CreatePeliculaDto } from './dto/create-pelicula.dto';

@Injectable()
export class PeliculasService { 
  // Inyecta el modelo de Mongoose
  constructor(
    @InjectModel(Pelicula.name) private peliculaModel: Model<PeliculaDocument>,
  ) {}

  // Método para crear una nueva película
  async create(createPeliculaDto: CreatePeliculaDto): Promise<Pelicula> { 
    const createdPelicula = new this.peliculaModel(createPeliculaDto);
    return createdPelicula.save();
  }

  // Método para obtener todas las películas
  async findAll(): Promise<Pelicula[]> { 
    return this.peliculaModel.find().exec();
  }
}