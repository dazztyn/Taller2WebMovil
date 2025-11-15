from sqlalchemy import Column, Integer, String
from .database import Base  # Importamos 'Base' desde nuestro archivo database.py

# Esta es tu "Entidad"
# Define la tabla 'songs' en la base de datos
class Song(Base):
    __tablename__ = "songs"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    artist_name = Column(String, index=True)
    album_cover_small = Column(String)
    preview = Column(String)