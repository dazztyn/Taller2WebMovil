from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List # Necesario para los "DTOs"

# Importamos desde nuestros nuevos archivos
from . import crud, models, schemas
from .database import SessionLocal, engine, init_db

# 1. Inicializamos la base de datos (esto también crea las tablas)
print("Inicializando base de datos...")
init_db()
print("Base de datos lista.")

app = FastAPI()

# 2. Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Dependencia para obtener la sesión de la BD (igual que antes)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 4. ENDPOINT 1: TOP 10 CANCIONES
# @app.get(...) es tu "Controlador"
# response_model le dice a FastAPI que valide la salida usando nuestro "DTO" schemas.Song
# List[schemas.Song] significa "una lista de canciones"
@app.get("/chart/0/tracks", response_model=List[schemas.Song])
def get_top_tracks(db: Session = Depends(get_db)):
    
    # 1. Llama a la función de "servicio" (crud.py)
    songs = crud.get_top_songs(db=db)
    
    # 2. Formateamos la salida para que coincida con el DTO (schemas.py)
    #    (Esto es necesario porque nuestros DTOs tienen 'artist' y 'album' anidados)
    response_data = []
    for song in songs:
        response_data.append({
            "id": song.id,
            "title": song.title,
            "artist": {"name": song.artist_name},
            "album": {"cover_small": song.album_cover_small},
            "preview": song.preview
        })
    
    # 3. Devolvemos los datos. Pydantic validará que coincidan con List[schemas.Song]
    return response_data

# 5. ENDPOINT 2: BÚSQUEDA
@app.get("/search", response_model=List[schemas.Song])
def search_tracks(q: str, db: Session = Depends(get_db)):
    
    # 1. Llama a la función de "servicio" (crud.py)
    songs = crud.search_songs(db=db, query=q)
    
    # 2. Formateamos la salida (igual que arriba)
    response_data = []
    for song in songs:
        response_data.append({
            "id": song.id,
            "title": song.title,
            "artist": {"name": song.artist_name},
            "album": {"cover_small": song.album_cover_small},
            "preview": song.preview
        })

    # 3. Devolvemos los datos
    return response_data

# 6. ENDPOINT Raíz
@app.get("/")
def read_root():
    return {"message": "Mi API de Música (FastAPI). Ve a /docs para la documentación."}