document.addEventListener('DOMContentLoaded', () => {

    // Referencias a las "pantallas" y elementos clave
    const viewMuscles = document.getElementById('view-muscles');
    const viewExercises = document.getElementById('view-exercises');
    const exerciseListContainer = document.getElementById('exercise-list-container');
    const btnBack = document.getElementById('btn-back');
    const exerciseTitle = document.getElementById('exercise-title');
    
    // Contenedor para las tarjetas de músculos (NUEVO)
    const muscleCardContainer = document.getElementById('muscle-card-container');

    // Referencias a los elementos del Modal (sin cambios)
    const exerciseModal = document.getElementById('exerciseModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalDesc = document.getElementById('modalDesc');
    const modalDetailsList = document.getElementById('modalDetailsList');

    // --- (NUEVA FUNCIÓN) ---
    // 1. Genera las tarjetas de músculos desde data.js
    function renderMuscleCards() {
        // Limpiar el contenedor por si acaso
        muscleCardContainer.innerHTML = '';
        
        // Usamos la variable 'muscleGroups' de data.js
        muscleGroups.forEach(group => {
            // Creamos el HTML para cada tarjeta
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
            // Añadimos la tarjeta al contenedor
            muscleCardContainer.innerHTML += cardHTML;
        });
    }

    // --- (FUNCIÓN MODIFICADA) ---
    // 2. Muestra la lista de ejercicios de un músculo
    function showExercises(muscleKey) {
        
        // AHORA BUSCAMOS EN EL ARRAY 'muscleGroups'
        const muscleGroup = muscleGroups.find(group => group.key === muscleKey);
        
        // Si no lo encontramos, no hacemos nada (seguridad)
        if (!muscleGroup) {
            console.error(`No se encontró el grupo muscular: ${muscleKey}`);
            return;
        }

        const muscleName = muscleGroup.name;
        const exercises = muscleGroup.exercises;
        
        exerciseListContainer.innerHTML = '';
        exerciseTitle.textContent = muscleName;

        exercises.forEach(exercise => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'list-group-item list-group-item-action';
            button.textContent = exercise.name;
            
            button.setAttribute('data-bs-toggle', 'modal');
            button.setAttribute('data-bs-target', '#exerciseModal');
            button.setAttribute('data-name', exercise.name);
            button.setAttribute('data-img', exercise.img);
            button.setAttribute('data-desc', exercise.desc);
            button.setAttribute('data-details', JSON.stringify(exercise.details)); 

            exerciseListContainer.appendChild(button);
        });

        viewMuscles.classList.add('d-none');
        viewExercises.classList.remove('d-none');
    }

    // 3. Función para volver (sin cambios)
    function showMuscles() {
        viewExercises.classList.add('d-none');
        viewMuscles.classList.remove('d-none');
    }

    // ---- EVENT LISTENERS (Oyentes de Clics) ----

    // --- (LISTENER MODIFICADO) ---
    // 1. Clic en una tarjeta de músculo (Usando Delegación de Eventos)
    //    Escuchamos en el 'contenedor' y no en cada tarjeta.
    muscleCardContainer.addEventListener('click', (event) => {
        // event.target es el elemento exacto donde se hizo clic
        // .closest() busca el ancestro más cercano que coincida
        const card = event.target.closest('.muscle-card');
        
        // Si se hizo clic dentro de una tarjeta (y no en el espacio entre ellas)
        if (card) {
            const muscleKey = card.getAttribute('data-muscle');
            showExercises(muscleKey);
        }
    });

    // 2. Clic en el botón "Volver" (sin cambios)
    btnBack.addEventListener('click', showMuscles);

    // 3. Lógica para rellenar el Modal (sin cambios)
    exerciseModal.addEventListener('show.bs.modal', (event) => {
        const button = event.relatedTarget;
        const name = button.getAttribute('data-name');
        const img = button.getAttribute('data-img');
        const desc = button.getAttribute('data-desc');
        const details = JSON.parse(button.getAttribute('data-details'));

        modalTitle.textContent = name;
        modalImage.src = img;
        modalDesc.textContent = desc;
        modalDetailsList.innerHTML = '';

        if (details.principal) {
            modalDetailsList.innerHTML += `<li><strong>Músculo principal:</strong> ${details.principal}</li>`;
        }
        if (details.secundarios) {
            modalDetailsList.innerHTML += `<li><strong>Secundarios:</strong> ${details.secundarios}</li>`;
        }
    });
    
    // --- (LLAMADA INICIAL) ---
    // Al cargar la página, genera las tarjetas de músculos
    renderMuscleCards();

});
