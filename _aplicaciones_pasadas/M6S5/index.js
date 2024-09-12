const fs = require("fs/promises");

const leerArchivo = async (archivoLectura) => {
    const respuesta = await fs.readFile(archivoLectura, "utf-8"); //devuelve un string
    return respuesta;
};

const escribirArchivo = async (archivo, contenido) => {
    await fs.writeFile(archivo, contenido, "utf-8");
    console.log("Ya se escribió el archivo");
};

const StringJson = (string) => JSON.parse(string); // transforma un string a un Objeto de JS {} || []

const JsonString = (objeto) => JSON.stringify(objeto, null, 2);

// CREATE
const agregarTarea = (nombreTarea, array) => {
    array.push({ nombre: nombreTarea, estado: "incompleto" });
};

// READ
const verTarea = (nombreTarea, array) => {
    const indiceTarea = array.findIndex(
        (tarea) => tarea.nombre === nombreTarea
    );

    console.log(array[indiceTarea]);
};

// UPDATE
const completarTarea = (nombreTarea, array) => {
    const indiceTarea = array.findIndex(
        (tarea) => tarea.nombre === nombreTarea
    );
    array[indiceTarea].estado = "completado";
};

// DELETE
const eliminarTarea = (nombreTarea, array) => {
    const indiceTarea = array.findIndex(
        (tarea) => tarea.nombre === nombreTarea
    );
    array.splice(indiceTarea, 1);
};

const main = async () => {
    // --- LEER ARGUMENTOS ---
    const [comando, nombreTarea] = process.argv.slice(2);

    // --- LEER ARCHIVO ---
    // 1./ Leer el archivo
    const contenido = await leerArchivo("tareas.json");
    // 2./ Parsear string a json
    let contenidoJSON = StringJson(contenido); // el texto que viene es un array []

    // -- EN BASE AL COMANDO, ELEGIMOS UNA ACCION
    if (comando === "agregar") {
        agregarTarea(nombreTarea, contenidoJSON);
    } else if (comando === "eliminar") {
        eliminarTarea(nombreTarea, contenidoJSON);
    } else if (comando === "completar") {
        completarTarea(nombreTarea, contenidoJSON);
    } else if (comando === "ver") {
        verTarea(nombreTarea, contenidoJSON);
        return;
    }

    // --- ESCRIBIR ARCHIVO ---
    // 1./ transformar de JSON a String (array a string)
    const contenidoStr = JsonString(contenidoJSON); // un string
    // 2./ Escribir
    await escribirArchivo("tareas.json", contenidoStr);
};

main();

// CRUD
// manejo de datos para cambiar registros

// CREATE => crear
// READ => leer
// UPDATE => actualizar
// DELETE => eliminar
