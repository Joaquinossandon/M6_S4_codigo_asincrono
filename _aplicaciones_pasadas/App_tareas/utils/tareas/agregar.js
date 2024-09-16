const { randomUUID } = require("crypto");
const { readFileAsJSON, writeFileFromJSON } = require("../fileSystem");

const add = async ({ name, desc }) => {
    const id = randomUUID();
    const status = "incompleto";
    const nuevaTarea = {
        id,
        name,
        desc,
        status,
    };

    const arrayTareas = await readFileAsJSON();
    arrayTareas.push(nuevaTarea);
    await writeFileFromJSON(arrayTareas);
    const nuevoArrayTareas = await readFileAsJSON();
    const taskFromFile = nuevoArrayTareas.find((tarea) => tarea.id === id);

    return {
        result: nuevoArrayTareas,
        addedTask: taskFromFile,
    };
};

module.exports = {
    add,
};
