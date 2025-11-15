from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = "sqlite:///../music.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Importamos los modelos para que SQLAlchemy los conozca
from . import models

def init_db():
    # Le decimos a SQLAlchemy que cree la tabla definida en models.py
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    if db.query(models.Song).count() == 0:
        print("Base de datos vacía, añadiendo datos de muestra...")
        # (El resto de tu lógica para añadir datos de muestra se queda igual)
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
        print("Datos de muestra añadidos.")
    else:
        print("La base de datos ya tiene datos.")
    db.close()