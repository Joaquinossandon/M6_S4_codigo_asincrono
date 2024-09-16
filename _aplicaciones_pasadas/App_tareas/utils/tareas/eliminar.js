const { readFileAsJSON, writeFileFromJSON } = require("../fileSystem");

const remove = async (id) => {
    const arrayTareas = await readFileAsJSON();
    const indexTarea = arrayTareas.findIndex((tarea) => tarea.id === id);
    if (indexTarea === -1) {
        return {
            error: "tarea no encontrada, no se puede eliminar",
            result: arrayTareas,
        };
    }
    const [tareaEliminada] = arrayTareas.splice(indexTarea, 1);
    await writeFileFromJSON(arrayTareas);
    const nuevoArrayTareas = await readFileAsJSON();
    return {
        result: nuevoArrayTareas,
        deletedTask: tareaEliminada,
    };
};

module.exports = {
    remove,
};
