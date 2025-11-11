import { muscleGroups } from './data.js';

document.addEventListener('DOMContentLoaded', () => {

    const viewMuscles = document.getElementById('view-muscles');
    const viewExercises = document.getElementById('view-exercises');
    const muscleCardContainer = document.getElementById('muscle-card-container');
    const exerciseListContainer = document.getElementById('exercise-list-container');
    const btnBack = document.getElementById('btn-back');
    const exerciseTitle = document.getElementById('exercise-title');
    
    const exerciseModal = document.getElementById('exerciseModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalDesc = document.getElementById('modalDesc');
    const modalDetailsList = document.getElementById('modalDetailsList');

    function renderMuscleCards() {
        muscleCardContainer.innerHTML = '';
        
        muscleGroups.forEach(group => {
            // Creamos el div de la columna para Bootstrap
            const colDiv = document.createElement('div');
            colDiv.className = 'col';

            // Creamos la tarjeta del músculo
            const cardDiv = document.createElement('div');
            cardDiv.className = 'card h-100 text-center shadow-sm muscle-card';
            cardDiv.setAttribute('data-muscle', group.key);
            
            // Establecemos la imagen de fondo directamente aquí
            cardDiv.style.backgroundImage = `url('${group.icon}')`;
            cardDiv.style.backgroundSize = 'cover';
            cardDiv.style.backgroundPosition = 'center';
            
            // Creamos el div para el contenido (nombre del músculo)
            const cardContentDiv = document.createElement('div');
            cardContentDiv.className = 'card-body d-flex flex-column justify-content-end text-white muscle-card-content';
            
            const cardTitle = document.createElement('h5');
            cardTitle.className = 'card-title fs-3 mb-0'; // mb-0 para que no tenga margen inferior
            cardTitle.textContent = group.name;

            cardContentDiv.appendChild(cardTitle);
            cardDiv.appendChild(cardContentDiv);
            colDiv.appendChild(cardDiv);
            muscleCardContainer.appendChild(colDiv);
        });
    }

    function showExercises(muscleKey) {
        const muscleGroup = muscleGroups.find(group => group.key === muscleKey);
        if (!muscleGroup) return;

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

    function showMuscles() {
        viewExercises.classList.add('d-none');
        viewMuscles.classList.remove('d-none');
    }

    muscleCardContainer.addEventListener('click', (event) => {
        const card = event.target.closest('.muscle-card');
        if (card) {
            const muscleKey = card.getAttribute('data-muscle');
            showExercises(muscleKey);
        }
    });

    btnBack.addEventListener('click', showMuscles);

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
    
    renderMuscleCards();
});
