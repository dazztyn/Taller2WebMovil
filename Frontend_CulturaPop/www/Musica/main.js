document.addEventListener('DOMContentLoaded', () => {
    
    // --- URLs de la API de FastAPI ---
    const API_TOP_URL = 'http://localhost:8008/chart/0/tracks';
    const API_SEARCH_URL = 'http://localhost:8008/search'; // ej: /search?q=nombre

    // --- Elementos del DOM ---
    const app = document.getElementById('app');
    const loading = document.getElementById('loading');

    // Botones de control
    const btnHome = document.getElementById('btn-home');
    const btnSortTitulo = document.getElementById('btn-sort-titulo');
    
    // Elementos de Búsqueda
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const clearButton = document.getElementById('clear-button');

    // Variable para guardar los datos actuales
    let currentSongs = [];

    // --- Lógica de Botones y Eventos ---

    btnHome.addEventListener('click', () => {
        window.location.href = '../index.html'; // Vuelve al Home
    });

    btnSortTitulo.addEventListener('click', () => {
        // Ordena alfabéticamente por título
        const cancionesOrdenadas = [...currentSongs].sort((a, b) => {
            return a.title.localeCompare(b.title);
        });
        renderSongs(cancionesOrdenadas);
    });

    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            cargarBusqueda(query);
        }
    });
    
    // Permite buscar con la tecla "Enter"
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });

    clearButton.addEventListener('click', () => {
        searchInput.value = ''; // Limpia el input
        cargarTopCanciones(); // Vuelve a cargar el Top 10
    });


    // --- Funciones Principales ---

    // Función para "aplanar" los datos de la API
    // La API entrega: { artist: { name: "..." } }
    // Lo convertimos a: { artistName: "..." }
    function mapApiData(song) {
        return {
            id: song.id,
            title: song.title,
            artistName: song.artist.name,
            albumCover: song.album.cover_small,
            preview: song.preview
        };
    }

    // Dibuja las tarjetas de canciones en la página
    function renderSongs(songs) {
        app.innerHTML = ''; // Limpia el contenedor

        if (songs.length === 0) {
            app.innerHTML = '<div id="loading">No se encontraron resultados.</div>';
            return;
        }

        songs.forEach(song => {
            const songCard = crearSongCard(song);
            app.appendChild(songCard);
        });
    }

    // Crea una tarjeta (card) para una canción
    function crearSongCard(song) {
        // Reciclamos las clases de CSS de películas/series
        const card = document.createElement('div');
        card.className = 'pelicula-card'; 

        const img = document.createElement('img');
        img.src = song.albumCover;
        img.alt = song.title;

        const cardBody = document.createElement('div');
        cardBody.className = 'pelicula-card-body';

        const titulo = document.createElement('h3');
        titulo.textContent = song.title;
        
        const subheader = document.createElement('p');
        subheader.className = 'subheader';
        subheader.textContent = song.artistName;

        // --- ¡NUEVO! Botón de Escuchar (en lugar de rating) ---
        // Usamos la URL 'preview' que nos da la API
        const playButton = document.createElement('a');
        playButton.className = 'play-button';
        playButton.href = song.preview;
        playButton.target = '_blank'; // Abre en una nueva pestaña
        playButton.textContent = '▶️ Escuchar';

        // Armar la tarjeta
        cardBody.appendChild(titulo);
        cardBody.appendChild(subheader);
        card.appendChild(img);
        card.appendChild(cardBody);
        card.appendChild(playButton);
        
        return card;
    }

    // --- Llamadas a la API ---

    // 1. Cargar la Búsqueda
    async function cargarBusqueda(query) {
        loading.style.display = 'block';
        loading.textContent = 'Buscando...';
        app.innerHTML = ''; // Limpia resultados anteriores

        try {
            const response = await fetch(`${API_SEARCH_URL}?q=${encodeURIComponent(query)}`);
            if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
            
            const songs = await response.json();
            currentSongs = songs.map(mapApiData); // "Aplanamos" los datos
            
            loading.style.display = 'none';
            renderSongs(currentSongs);

        } catch (error) {
            console.error('No se pudo realizar la búsqueda:', error);
            loading.textContent = 'Error al buscar. Revisa la consola.';
        }
    }

    // 2. Cargar el Top 10 (por defecto)
    async function cargarTopCanciones() {
        loading.style.display = 'block';
        loading.textContent = 'Cargando top canciones...';
        app.innerHTML = '';

        try {
            const response = await fetch(API_TOP_URL);
            if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
            
            const songs = await response.json();
            currentSongs = songs.map(mapApiData); // "Aplanamos" los datos
            
            loading.style.display = 'none';
            renderSongs(currentSongs);

        } catch (error) {
            console.error('No se pudieron cargar las canciones:', error);
            loading.textContent = 'Error al cargar canciones. Revisa la consola.';
        }
    }

    // Iniciar la app cargando el Top 10
    cargarTopCanciones();
});