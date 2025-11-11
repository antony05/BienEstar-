// Espera a que todo el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {

    // Referencias a las "pantallas" y elementos clave
    const viewMuscles = document.getElementById('view-muscles');
    const viewExercises = document.getElementById('view-exercises');
    const exerciseListContainer = document.getElementById('exercise-list-container');
    const btnBack = document.getElementById('btn-back');
    const exerciseTitle = document.getElementById('exercise-title');
    const muscleCards = document.querySelectorAll('.muscle-card');

    // Referencias a los elementos del Modal
    const exerciseModal = document.getElementById('exerciseModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalDesc = document.getElementById('modalDesc');
    const modalDetailsList = document.getElementById('modalDetailsList');


    // ---- NAVEGACIÓN ENTRE PANTALLAS ----

    // Función para mostrar la lista de ejercicios de un músculo
    function showExercises(muscleKey) {
        // 1. Obtener los datos del músculo desde 'exerciseData' (que está en data.js)
        const muscleName = muscleKey.charAt(0).toUpperCase() + muscleKey.slice(1);
        const exercises = exerciseData[muscleKey];
        
        // 2. Limpiar la lista de ejercicios anterior
        exerciseListContainer.innerHTML = '';

        // 3. Poner el título correcto
        exerciseTitle.textContent = muscleName;

        // 4. Crear y agregar los botones de ejercicios
        exercises.forEach(exercise => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'list-group-item list-group-item-action';
            button.textContent = exercise.name;
            
            // 5. Añadir los atributos 'data-*' para el modal
            button.setAttribute('data-bs-toggle', 'modal');
            button.setAttribute('data-bs-target', '#exerciseModal');
            button.setAttribute('data-name', exercise.name);
            button.setAttribute('data-img', exercise.img);
            button.setAttribute('data-desc', exercise.desc);
            // Convertimos el objeto de detalles a un string para guardarlo
            button.setAttribute('data-details', JSON.stringify(exercise.details)); 

            exerciseListContainer.appendChild(button);
        });

        // 6. Ocultar la vista de músculos y mostrar la de ejercicios
        viewMuscles.classList.add('d-none');
        viewExercises.classList.remove('d-none');
    }

    // Función para volver a la pantalla de músculos
    function showMuscles() {
        viewExercises.classList.add('d-none');
        viewMuscles.classList.remove('d-none');
    }

    // ---- EVENT LISTENERS (Oyentes de Clics) ----

    // 1. Clic en una tarjeta de músculo
    muscleCards.forEach(card => {
        card.addEventListener('click', () => {
            const muscleKey = card.getAttribute('data-muscle');
            showExercises(muscleKey);
        });
    });

    // 2. Clic en el botón "Volver"
    btnBack.addEventListener('click', showMuscles);

    // 3. Lógica para rellenar el Modal (se activa cuando está a punto de mostrarse)
    //    Esta lógica ahora lee los 'data-*' de los botones que creamos dinámicamente
    exerciseModal.addEventListener('show.bs.modal', (event) => {
        const button = event.relatedTarget; // El botón de ejercicio que se presionó

        // Extraer datos
        const name = button.getAttribute('data-name');
        const img = button.getAttribute('data-img');
        const desc = button.getAttribute('data-desc');
        // Convertir el string de detalles de nuevo a un objeto
        const details = JSON.parse(button.getAttribute('data-details'));

        // Rellenar el modal
        modalTitle.textContent = name;
        modalImage.src = img;
        modalDesc.textContent = desc;

        // Rellenar la lista de detalles
        modalDetailsList.innerHTML = ''; // Limpiar detalles anteriores
        if (details.principal) {
            modalDetailsList.innerHTML += `<li><strong>Músculo principal:</strong> ${details.principal}</li>`;
        }
        if (details.secundarios) {
            modalDetailsList.innerHTML += `<li><strong>Secundarios:</strong> ${details.secundarios}</li>`;
        }
    });

});
