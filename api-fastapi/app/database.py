import requests
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

from . import models


DATABASE_URL = "sqlite:///../music.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def init_db():

    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()

    if db.query(models.Song).count() == 0:

        try:
            print("Base de datos vacía. Intentando poblar desde la API de Deezer...")
            
            DEEZER_API_URL = "https://api.deezer.com/chart/0/tracks"
            response = requests.get(DEEZER_API_URL, timeout=5)
            response.raise_for_status()  
            
            deezer_data = response.json()
            
            songs_to_add = []
            for song_data in deezer_data['data']:
                new_song = models.Song(
                    id=song_data['id'],
                    title=song_data['title'],
                    artist_name=song_data['artist']['name'],
                    album_cover_small=song_data['album']['cover_small'],
                    preview=song_data['preview']
                )
                songs_to_add.append(new_song)
            
            db.add_all(songs_to_add)
            db.commit()
            print(f"¡Éxito! Se añadieron {len(songs_to_add)} canciones desde Deezer.")

        except Exception as e:
            print(f"ADVERTENCIA: Falló la carga desde Deezer (Error: {e}).")
            print("Usando datos de muestra manuales como respaldo.")
            db.rollback()

            sample_songs = [
                models.Song(title="Golden", artist_name="Jungkook", album_cover_small="https://via.placeholder.com/100", preview="https://via.placeholder.com/100"),
                models.Song(title="undressed", artist_name="Kim Petras", album_cover_small="https://via.placeholder.com/100", preview="https://via.placeholder.com/100"),
                models.Song(title="Good News", artist_name="Mac Miller", album_cover_small="https://via.placeholder.com/100", preview="https://via.placeholder.com/100"),
                models.Song(title="Cruel Summer", artist_name="Taylor Swift", album_cover_small="https://via.placeholder.com/100", preview="https://via.placeholder.com/100"),
                models.Song(title="Blinding Lights", artist_name="The Weeknd", album_cover_small="https://via.placeholder.com/100", preview="https://via.placeholder.com/100"),
                models.Song(title="Houdini", artist_name="Dua Lipa", album_cover_small="https://via.placeholder.com/100", preview="https://via.placeholder.com/100"),
                models.Song(title="La Diabla", artist_name="Xavi", album_cover_small="https://via.placeholder.com/100", preview="https://via.placeholder.com/100"),
                models.Song(title="Flowers", artist_name="Miley Cyrus", album_cover_small="https://via.placeholder.com/100", preview="https://via.placeholder.com/100"),
                models.Song(title="As It Was", artist_name="Harry Styles", album_cover_small="https://via.placeholder.com/100", preview="https://via.placeholder.com/100"),
                models.Song(title="Paint The Town Red", artist_name="Doja Cat", album_cover_small="https://via.placeholder.com/100", preview="https://via.placeholder.com/100"),
            ]
            
            db.add_all(sample_songs)
            db.commit()
            print("Datos de muestra manuales añadidos.")
            
    else:
        print("La base de datos ya tiene datos.")
    
    db.close()