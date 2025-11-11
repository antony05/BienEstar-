// Añadimos "export" para que main.js pueda importarlo
export const muscleGroups = [
    {
        key: "pectorales", // ID único
        name: "Pectorales P", // Nombre para mostrar
        icon: "assets/img/muscles/pectorales.webp", // Icono de la tarjeta
        exercises: [ // Lista de ejercicios
            {
                name: "Press de Banca",
                img: "assets/img/pectorales/press_banca.webp",
                desc: "Acuéstate en un banco plano. Agarra la barra con un agarre un poco más ancho que tus hombros. Baja la barra al pecho de forma controlada y súbela de forma explosiva.",
                details: {
                    principal: "Pectoral Mayor",
                    secundarios: "Tríceps, Hombro anterior"
                }
            },
            {
                name: "Fondos en Paralelas",
                img: "assets/img/pectorales/fondos.webp",
                desc: "Sujétate de las barras paralelas, inclina el torso ligeramente hacia adelante y baja tu cuerpo flexionando los codos. Empuja hacia arriba para volver a la posición inicial.",
                details: {
                    principal: "Pectoral Inferior",
                    secundarios: "Tríceps, Hombro anterior"
                }
            }
        ]
    },
    {
        key: "hombros",
        name: "Hombros",
        icon: "assets/img/muscles/hombros.webp",
        exercises: [
            {
                name: "Press Militar con Barra",
                img: "assets/img/hombros/press_militar.webp",
                desc: "Sentado o de pie, sujeta la barra a la altura de los hombros. Empuja la barra hacia arriba por encima de tu cabeza hasta extender los brazos. Baja de forma controlada.",
                details: {
                    principal: "Deltoides (Hombro)",
                    secundarios: "Tríceps"
                }
            }
        ]
    },
    {
        key: "biceps",
        name: "Bíceps",
        icon: "assets/img/muscles/biceps.webp",
        exercises: [
            // { name: "Curl con barra", img: "...", desc: "...", details: {...} }
        ]
    },
    {
        key: "triceps",
        name: "Tríceps",
        icon: "assets/img/muscles/triceps.webp",
        exercises: [
             // ...
        ]
    },
    {
        key: "espalda",
        name: "Espalda",
        icon: "assets/img/muscles/espalda.webp",
        exercises: [
             // ...
        ]
    },
    {
        key: "piernas",
        name: "Piernas",
        icon: "assets/img/muscles/piernas.webp",
        exercises: [
             // ...
        ]
    },
    {
        key: "abdomen",
        name: "Abdomen",
        icon: "assets/img/muscles/abdomen.webp",
        exercises: [
             // ...
        ]
    }
];
