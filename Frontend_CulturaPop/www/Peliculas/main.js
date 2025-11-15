// Espera a que todo el HTML esté cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {
    
    const apiUrl = 'http://localhost:3000/peliculas'; // Tu API de NestJS
    const app = document.getElementById('app');
    const loading = document.getElementById('loading');

    // Referencias a los nuevos botones
    const btnHome = document.getElementById('btn-home');
    const btnSortNombre = document.getElementById('btn-sort-nombre');
    const btnSortRating = document.getElementById('btn-sort-rating');

    // Variable para guardar los datos de la API
    let todasLasPeliculas = [];

    // --- Lógica de los Botones ---

    btnHome.addEventListener('click', () => {
        // Vuelve al index.html (subiendo un nivel en la carpeta)
        window.location.href = '../index.html';
    });

    btnSortNombre.addEventListener('click', () => {
        // Ordena alfabéticamente por título
        const peliculasOrdenadas = [...todasLasPeliculas].sort((a, b) => {
            return a.titulo.localeCompare(b.titulo);
        });
        renderPeliculas(peliculasOrdenadas);
    });

    btnSortRating.addEventListener('click', () => {
        // Ordena numéricamente por puntuación (de mayor a menor)
        const peliculasOrdenadas = [...todasLasPeliculas].sort((a, b) => {
            return b.puntuacion - a.puntuacion;
        });
        renderPeliculas(peliculasOrdenadas);
    });


    // --- Funciones Principales ---

    // NUEVA FUNCIÓN: Dibuja las películas en la página
    // Recibe un array de películas y las muestra
    function renderPeliculas(peliculas) {
        // 1. Limpia el contenedor de películas
        app.innerHTML = ''; 

        // 2. Por cada película, crear una tarjeta y agregarla a la app
        peliculas.forEach(pelicula => {
            const peliculaCard = crearPeliculaCard(pelicula);
            app.appendChild(peliculaCard);
        });
    }

    // Función para crear una "tarjeta" (card) de película (sin cambios)
    function crearPeliculaCard(pelicula) {
        const card = document.createElement('div');
        card.className = 'pelicula-card'; 
        const img = document.createElement('img');
        img.src = pelicula.imagenUrl;
        img.alt = pelicula.titulo;
        const cardBody = document.createElement('div');
        cardBody.className = 'pelicula-card-body';
        const titulo = document.createElement('h3');
        titulo.textContent = pelicula.titulo;
        const subheader = document.createElement('p');
        subheader.className = 'subheader';
        subheader.textContent = `${pelicula.genero} (${pelicula.ano})`;
        const descripcion = document.createElement('p');
        descripcion.textContent = pelicula.descripcion;
        const puntuacion = document.createElement('div');
        puntuacion.className = 'puntuacion';
        puntuacion.textContent = `⭐ ${pelicula.puntuacion}`;
        
        cardBody.appendChild(titulo);
        cardBody.appendChild(subheader);
        cardBody.appendChild(descripcion);
        card.appendChild(img);
        card.appendChild(cardBody);
        card.appendChild(puntuacion);
        
        return card;
    }

    // --- Llamada a la API ---
    async function cargarPeliculas() {
        try {
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            const peliculas = await response.json();
            
            // Guarda las películas en nuestra variable
            todasLasPeliculas = peliculas; 

            // Ocultar el mensaje "Cargando..."
            loading.style.display = 'none';

            // Dibuja las películas por primera vez
            renderPeliculas(todasLasPeliculas);

        } catch (error) {
            console.error('No se pudieron cargar las películas:', error);
            loading.textContent = 'Error al cargar las películas. Revisa la consola.';
        }
    }

    // Iniciar la carga de películas
    cargarPeliculas();
});