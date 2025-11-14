import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PeliculasModule } from './peliculas/peliculas.module'; 

@Module({
  imports: [
    
    MongooseModule.forRoot('mongodb://localhost:27017/infomovilDB'),

    PeliculasModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
