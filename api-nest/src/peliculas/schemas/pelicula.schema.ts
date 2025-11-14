import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PeliculaDocument = Pelicula & Document;

@Schema()
export class Pelicula {
  @Prop({ required: true })
  titulo: string;

  @Prop()
  ano: number;

  @Prop()
  descripcion: string;

  @Prop()
  puntuacion: number; 

  @Prop()
  imagenUrl: string; 

  @Prop()
  genero: string;
}

export const PeliculaSchema = SchemaFactory.createForClass(Pelicula);