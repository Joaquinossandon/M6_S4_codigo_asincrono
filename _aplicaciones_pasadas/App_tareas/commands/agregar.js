const { randomUUID } = require("crypto");
const { readFileAsJSON, writeFileFromJSON } = require("../utils/fileSystem");

const config = {
    name: {
        description: "El titulo de la tarea",
        demandOption: true,
        alias: "n",
    },
    desc: {
        description: "La descripcion de la tarea",
        demandOption: true,
        alias: "d",
    },
};

const agregarTarea = async ({ name, desc }) => {
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
};

module.exports = ["create", "Crea una nueva tarea", config, agregarTarea];
