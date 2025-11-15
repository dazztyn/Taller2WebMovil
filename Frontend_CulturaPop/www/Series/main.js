// Espera a que todo el HTML esté cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {
    
    // --- ¡CAMBIO CLAVE 1: La URL de la API! ---
    const apiUrl = 'http://localhost:3002/series'; // <-- Tu API de Express
    const app = document.getElementById('app');
    const loading = document.getElementById('loading');

    const btnHome = document.getElementById('btn-home');
    const btnSortNombre = document.getElementById('btn-sort-nombre');
    const btnSortRating = document.getElementById('btn-sort-rating');

    let todasLasSeries = []; // Variable para guardar los datos

    // --- Lógica de los Botones ---

    btnHome.addEventListener('click', () => {
        // Vuelve al index.html (subiendo un nivel)
        window.location.href = '../index.html';
    });

    btnSortNombre.addEventListener('click', () => {
        const seriesOrdenadas = [...todasLasSeries].sort((a, b) => {
            return a.titulo.localeCompare(b.titulo);
        });
        renderSeries(seriesOrdenadas);
    });

    btnSortRating.addEventListener('click', () => {
        // --- ¡CAMBIO CLAVE 2: Usar 'rating' en lugar de 'puntuacion' ---
        const seriesOrdenadas = [...todasLasSeries].sort((a, b) => {
            return b.rating - a.rating; // Ordenar por rating
        });
        renderSeries(seriesOrdenadas);
    });


    // --- Funciones Principales ---

    function renderSeries(series) {
        app.innerHTML = ''; // Limpia el contenedor
        series.forEach(serie => {
            const serieCard = crearSerieCard(serie);
            app.appendChild(serieCard);
        });
    }

    // --- ¡CAMBIO CLAVE 3: Mapeo de datos de la API de Series ---
    function crearSerieCard(serie) {
        // Usamos las MISMAS clases CSS que películas para reciclar el estilo
        const card = document.createElement('div');
        card.className = 'pelicula-card'; 

        const img = document.createElement('img');
        img.src = serie.imagen; // <-- Campo 'imagen'
        img.alt = serie.titulo;

        const cardBody = document.createElement('div');
        cardBody.className = 'pelicula-card-body';

        const titulo = document.createElement('h3');
        titulo.textContent = serie.titulo;
        
        // Extraemos solo el año de la fecha 'estreno'
        const anoEstreno = new Date(serie.estreno).getFullYear();
        
        const subheader = document.createElement('p');
        subheader.className = 'subheader';
        subheader.textContent = `${serie.genero} (${anoEstreno})`; // <-- Campo 'genero' y 'estreno'

        // NOTA: Tu series.json no tiene 'descripcion', así que la omitimos.

        const puntuacion = document.createElement('div');
        puntuacion.className = 'puntuacion';
        puntuacion.textContent = `⭐ ${serie.rating}`; // <-- Campo 'rating'

        cardBody.appendChild(titulo);
        cardBody.appendChild(subheader);
        card.appendChild(img);
        card.appendChild(cardBody);
        card.appendChild(puntuacion);
        
        return card;
    }

    // --- Llamada a la API ---
    async function cargarSeries() {
        try {
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            const series = await response.json();
            
            todasLasSeries = series; 
            loading.style.display = 'none';
            renderSeries(todasLasSeries); // Dibuja las series

        } catch (error) {
            console.error('No se pudieron cargar las series:', error);
            loading.textContent = 'Error al cargar las series. Revisa la consola.';
        }
    }

    cargarSeries();
});