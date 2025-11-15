from sqlalchemy.orm import Session
from sqlalchemy import or_
from . import models


def get_top_songs(db: Session, limit: int = 10):

    return db.query(models.Song).limit(limit).all()

def search_songs(db: Session, query: str):
    search_query = f"%{query}%"
    return db.query(models.Song).filter(
        or_(
            models.Song.title.like(search_query),
            models.Song.artist_name.like(search_query)
        )
    ).all()