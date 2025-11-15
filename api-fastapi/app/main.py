from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List 
from . import crud, models, schemas
from .database import SessionLocal, engine, init_db

print("Inicializando base de datos...")
init_db()
print("Base de datos lista.")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/chart/0/tracks", response_model=List[schemas.Song])
def get_top_tracks(db: Session = Depends(get_db)):

    songs = crud.get_top_songs(db=db)

    response_data = []
    for song in songs:
        response_data.append({
            "id": song.id,
            "title": song.title,
            "artist": {"name": song.artist_name},
            "album": {"cover_small": song.album_cover_small},
            "preview": song.preview
        })

    return response_data

@app.get("/search", response_model=List[schemas.Song])
def search_tracks(q: str, db: Session = Depends(get_db)):

    songs = crud.search_songs(db=db, query=q)

    response_data = []
    for song in songs:
        response_data.append({
            "id": song.id,
            "title": song.title,
            "artist": {"name": song.artist_name},
            "album": {"cover_small": song.album_cover_small},
            "preview": song.preview
        })

    return response_data

@app.get("/")
def read_root():
    return {"message": "Mi API de Música (FastAPI). Ve a /docs para la documentación."}