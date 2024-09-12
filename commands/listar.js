const { readFileAsJSON, writeFileFromJSON } = require("../utils/fileSystem");

const config = {
    human: {
        description: "Muesta las tareas en un formato legible",
        alias: "h",
    },
    id: {
        description: "Muestra una sola tarea a partir de su ID",
    },
};

const listarHumano = (arrayTareas) => {
    arrayTareas.forEach((tarea, index) => {
        console.log(`---- TAREA ${index + 1} ----
nombre: ${tarea.name}
descripción: ${tarea.desc}
estado: ${tarea.status}
id: ${tarea.id}
`);
    });
};

const mostrarPorID = (arrayTareas, id) => {
    const tarea = arrayTareas.find((tarea) => tarea.id === id);
    // undefined y null es falsy
    if (!tarea) {
        return console.log("No existe esa tarea");
    }
    console.log(tarea);
};

const listarTareas = async ({ human, id }) => {
    const arrayTareas = await readFileAsJSON();
    if (human) {
        return listarHumano(arrayTareas);
    }
    if (id) {
        return mostrarPorID(arrayTareas, id);
    }
    if (!arrayTareas.length) {
        return console.log("No hay tareas");
    }
    console.log("Lista de tareas:", arrayTareas);
};

module.exports = ["list", "listar las tareas", config, listarTareas];
