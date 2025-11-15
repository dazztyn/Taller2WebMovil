from sqlalchemy.orm import Session
from sqlalchemy import or_
from . import models

# Esta es tu función de "servicio" para obtener el Top 10
def get_top_songs(db: Session, limit: int = 10):
    """
    Obtiene las primeras 'limit' canciones de la base de datos.
    """
    # Aquí está la lógica de la base de datos
    return db.query(models.Song).limit(limit).all()

# Esta es tu función de "servicio" para la búsqueda
def search_songs(db: Session, query: str):
    """
    Busca canciones por título o artista en la base de datos.
    """
    search_query = f"%{query}%"
    # Aquí está la lógica de la base de datos
    return db.query(models.Song).filter(
        or_(
            models.Song.title.like(search_query),
            models.Song.artist_name.like(search_query)
        )
    ).all()