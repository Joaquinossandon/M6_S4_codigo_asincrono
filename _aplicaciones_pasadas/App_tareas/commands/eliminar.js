const { readFileAsJSON, writeFileFromJSON } = require("../utils/fileSystem");

const config = {
    id: {
        description: "El id de la tarea a eliminar",
        demandOption: true,
    },
};

const eliminarTarea = async ({ id }) => {
    const arrayTareas = await readFileAsJSON();
    const indexTarea = arrayTareas.findIndex((tarea) => tarea.id === id);
    if (indexTarea === -1) {
        return console.log("La tarea no existe.");
    }
    const [tareaEliminada] = arrayTareas.splice(indexTarea, 1);
    console.log("Tarea eliminada", tareaEliminada);
    await writeFileFromJSON(arrayTareas);
};

module.exports = ["delete", "elimina una tarea", config, eliminarTarea];
