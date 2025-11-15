from sqlalchemy import Column, Integer, String
from .database import Base


class Song(Base):
    __tablename__ = "songs"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    artist_name = Column(String, index=True)
    album_cover_small = Column(String)
    preview = Column(String)