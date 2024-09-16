const { readFileAsJSON } = require("../fileSystem");

const allTasks = async () => {
    const arrayTareas = await readFileAsJSON();
    if (!arrayTareas.length) {
        return {
            error: "No hay tareas",
            result: [],
        };
    }
    return { result: arrayTareas };
};

const byId = async (id) => {
    const arrayTareas = await readFileAsJSON();
    const tarea = arrayTareas.find((tarea) => tarea.id === id);
    // undefined y null es falsy
    if (!tarea) {
        return {
            error: "No existe esa tarea",
            result: {},
        };
    }
    return {
        result: tarea,
    };
};

module.exports = {
    allTasks,
    byId
};
