// 1. IMPORTAMOS los datos desde data.js
// La ruta './data.js' es relativa a este archivo (main.js)
import { muscleGroups } from './data.js';

// 2. Esperamos a que el HTML esté listo
document.addEventListener('DOMContentLoaded', () => {

    // --- Referencias a elementos del DOM ---
    const viewMuscles = document.getElementById('view-muscles');
    const viewExercises = document.getElementById('view-exercises');
    const muscleCardContainer = document.getElementById('muscle-card-container');
    const exerciseListContainer = document.getElementById('exercise-list-container');
    const btnBack = document.getElementById('btn-back');
    const exerciseTitle = document.getElementById('exercise-title');
    
    // Referencias al Modal
    const exerciseModal = document.getElementById('exerciseModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalDesc = document.getElementById('modalDesc');
    const modalDetailsList = document.getElementById('modalDetailsList');

    // --- Función 1: Renderizar las tarjetas de Músculos ---
    function renderMuscleCards() {
        muscleCardContainer.innerHTML = ''; // Limpiamos el contenedor
        
        muscleGroups.forEach(group => {
            const cardHTML = `
                <div class="col">
                    <div class="card h-100 text-center shadow-sm muscle-card" data-muscle="${group.key}">
                        <div class="card-body">
                            <img src="${group.icon}" alt="Icono de ${group.name}" class="muscle-icon mb-3">
                            <h5 class="card-title fs-3">${group.name}</h5>
                        </div>
                    </div>
                </div>
            `;
            muscleCardContainer.innerHTML += cardHTML;
        });
    }

    // --- Función 2: Mostrar la pantalla de Ejercicios ---
    function showExercises(muscleKey) {
        // Encontramos el grupo muscular en nuestros datos
        const muscleGroup = muscleGroups.find(group => group.key === muscleKey);
        
        if (!muscleGroup) return; // Seguridad

        const muscleName = muscleGroup.name;
        const exercises = muscleGroup.exercises;
        
        exerciseListContainer.innerHTML = ''; // Limpiamos lista anterior
        exerciseTitle.textContent = muscleName; // Ponemos el título

        // Creamos los botones para cada ejercicio
        exercises.forEach(exercise => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'list-group-item list-group-item-action';
            button.textContent = exercise.name;
            
            // Guardamos TODOS los datos en el botón para que el modal los lea
            button.setAttribute('data-bs-toggle', 'modal');
            button.setAttribute('data-bs-target', '#exerciseModal');
            button.setAttribute('data-name', exercise.name);
            button.setAttribute('data-img', exercise.img);
            button.setAttribute('data-desc', exercise.desc);
            button.setAttribute('data-details', JSON.stringify(exercise.details)); 

            exerciseListContainer.appendChild(button);
        });

        // Cambiamos de pantalla
        viewMuscles.classList.add('d-none');
        viewExercises.classList.remove('d-none');
    }

    // --- Función 3: Volver a la pantalla de Músculos ---
    function showMuscles() {
        viewExercises.classList.add('d-none');
        viewMuscles.classList.remove('d-none');
    }

    // --- Asignación de Eventos (Event Listeners) ---

    // 1. Clic en una tarjeta de músculo (usando delegación de eventos)
    muscleCardContainer.addEventListener('click', (event) => {
        const card = event.target.closest('.muscle-card');
        if (card) {
            const muscleKey = card.getAttribute('data-muscle');
            showExercises(muscleKey);
        }
    });

    // 2. Clic en el botón "Volver"
    btnBack.addEventListener('click', showMuscles);

    // 3. Evento cuando el Modal está a punto de mostrarse
    exerciseModal.addEventListener('show.bs.modal', (event) => {
        // Obtenemos el botón que disparó el modal
        const button = event.relatedTarget;
        
        // Extraemos los datos del botón
        const name = button.getAttribute('data-name');
        const img = button.getAttribute('data-img');
        const desc = button.getAttribute('data-desc');
        const details = JSON.parse(button.getAttribute('data-details'));

        // Rellenamos el contenido del modal
        modalTitle.textContent = name;
        modalImage.src = img;
        modalDesc.textContent = desc;

        // Limpiamos y rellenamos la lista de detalles
        modalDetailsList.innerHTML = '';
        if (details.principal) {
            modalDetailsList.innerHTML += `<li><strong>Músculo principal:</strong> ${details.principal}</li>`;
        }
        if (details.secundarios) {
            modalDetailsList.innerHTML += `<li><strong>Secundarios:</strong> ${details.secundarios}</li>`;
        }
    });
    
    // --- Carga Inicial ---
    // Renderizamos las tarjetas de músculos en cuanto carga la página
    renderMuscleCards();
});
