from pydantic import BaseModel

# Este es el "DTO" para el objeto anidado 'artist'
class SongArtist(BaseModel):
    name: str

# Este es el "DTO" para el objeto anidado 'album'
class SongAlbum(BaseModel):
    cover_small: str

# Este es tu "DTO" principal para la canción
# Define la forma exacta de la respuesta JSON que tu frontend espera    
class Song(BaseModel):
    id: int
    title: str
    artist: SongArtist      # Usa el DTO anidado
    album: SongAlbum        # Usa el DTO anidado
    preview: str

    # Esta configuración especial le dice a Pydantic
    # que puede leer datos desde un modelo de SQLAlchemy (ORM)
    class Config:
        from_attributes = True