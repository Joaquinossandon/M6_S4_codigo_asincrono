const fs = require("fs/promises");

const leerArchivo = async (archivoLectura) => {
    const respuesta = await fs.readFile(archivoLectura, "utf-8");
    return respuesta;
};

const parseJson = (string) => JSON.parse(string);

const JsonString = (objeto) => JSON.stringify(objeto, null, 2);

const escribirArchivo = async (archivo, contenido) => {
    await fs.writeFile(archivo, contenido, "utf-8");
    console.log("Ya se escribió el archivo");
};

const main = async () => {
    // ------- leer archivo
    const contenido = await leerArchivo("programa.json");
    // parseamos a JSON
    const contenidoJSON = parseJson(contenido);
    // hacemos un clon de nuestro objeto para no editar el original
    // (con structured clone se hace un clon profundo, con spread operator se hace un clon superficial)
    const nuevoContenido = structuredClone(contenidoJSON); // antes para esto se usaba lodash
    // cambiamos algunas propiedades de nuestro clon
    nuevoContenido.nombre = "Python";
    nuevoContenido.Herramientas.lista = ["tres", "cuatro"];

    // ------ escribir el nuevo contenido
    // antes de escribir, debemos transformar nuestro json a string
    const nuevoContenidoStr = JsonString(nuevoContenido); // devuelve un string
    // escribir el archivo
    escribirArchivo("programa.json", nuevoContenidoStr);

    const contenidoActual = await leerArchivo("programa.json");

    console.log(`
        Contenido anterior:
            ${contenido}
        
        Nuevo Contenido:
            ${contenidoActual}
    `);
};

main();
