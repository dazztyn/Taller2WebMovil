from pydantic import BaseModel

class SongArtist(BaseModel):
    name: str

class SongAlbum(BaseModel):
    cover_small: str
 
class Song(BaseModel):
    id: int
    title: str
    artist: SongArtist 
    album: SongAlbum 
    preview: str

    class Config:
        from_attributes = True