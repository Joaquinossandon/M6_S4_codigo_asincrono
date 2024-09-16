const { readFileAsJSON, writeFileFromJSON } = require("../utils/fileSystem");

const config = {
    id: {
        description: "El id de la tarea a editar",
        demandOption: true,
    },
    status: {
        description: "Cambiar el estado actual",
        alias: "s",
    },
    name: {
        description: "El nuevo nombre de la tarea",
        alias: "n",
    },
    desc: {
        description: "La nueva descripción de la tarea",
        alias: "d",
    },
};

const editarTarea = async ({ id, status, name, desc }) => {
    const arrayTareas = await readFileAsJSON();
    const indexTarea = arrayTareas.findIndex((tarea) => tarea.id === id);
    if (indexTarea === -1) {
        return console.log("La tarea no existe.");
    }
    // obtener la tarea desde el arreglo
    let tarea = arrayTareas[indexTarea];
    tarea = {
        ...tarea,
        status: status ? status : tarea.status,
        name: name ? name : tarea.name,
        desc: desc ? desc : tarea.desc,
    };

    arrayTareas.splice(indexTarea, 1, tarea);
    await writeFileFromJSON(arrayTareas);
};

module.exports = ["edit", "edita una tarea", config, editarTarea];
