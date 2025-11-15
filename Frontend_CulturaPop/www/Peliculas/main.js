// Espera a que todo el HTML esté cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {
    
    const apiUrl = 'http://localhost:3000/peliculas'; // <-- ¡Tu API de NestJS!
    const app = document.getElementById('app');
    const loading = document.getElementById('loading');

    // Función para crear una "tarjeta" (card) de película
    function crearPeliculaCard(pelicula) {
        // 1. Crear el contenedor principal de la tarjeta
        const card = document.createElement('div');
        card.className = 'pelicula-card'; // Le asignamos una clase para el CSS

        // 2. Crear la imagen
        const img = document.createElement('img');
        img.src = pelicula.imagenUrl;
        img.alt = pelicula.titulo;

        // 3. Crear el cuerpo de la tarjeta (con el texto)
        const cardBody = document.createElement('div');
        cardBody.className = 'pelicula-card-body';

        // 4. Crear el título
        const titulo = document.createElement('h3');
        titulo.textContent = pelicula.titulo;
        
        // 5. Crear el género y el año
        const subheader = document.createElement('p');
        subheader.className = 'subheader';
        subheader.textContent = `${pelicula.genero} (${pelicula.ano})`;

        // 6. Crear la descripción
        const descripcion = document.createElement('p');
        descripcion.textContent = pelicula.descripcion;

        // 7. Crear la puntuación
        const puntuacion = document.createElement('div');
        puntuacion.className = 'puntuacion';
        puntuacion.textContent = `⭐ ${pelicula.puntuacion}`;

        // 8. "Armar" la tarjeta
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
            
            // Ocultar el mensaje "Cargando..."
            loading.style.display = 'none';

            // Por cada película en el array, crear una tarjeta y agregarla a la app
            peliculas.forEach(pelicula => {
                const peliculaCard = crearPeliculaCard(pelicula);
                app.appendChild(peliculaCard);
            });

        } catch (error) {
            console.error('No se pudieron cargar las películas:', error);
            loading.textContent = 'Error al cargar las películas. Revisa la consola.';
        }
    }

    // Iniciar la carga de películas
    cargarPeliculas();
});