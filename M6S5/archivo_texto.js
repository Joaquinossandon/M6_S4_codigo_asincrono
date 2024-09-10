const fs = require("fs/promises");

const leerArchivo = async (archivoLectura) => {
    const respuesta = await fs.readFile(archivoLectura, "utf-8");
    return respuesta;
};

const escribirArchivo = async ({ archivo, contenido }) => {
    await fs.writeFile(archivo, contenido, "utf-8");
    console.log("Ya se escribió el archivo");
};

const main = async () => {
    const respuesta = await leerArchivo("mensaje.txt");
    const nuevoContenido = `${respuesta} otro contenido`;
    await escribirArchivo({
        archivo: "mensaje.txt",
        contenido: nuevoContenido,
    });
    const respuestaActual = await leerArchivo("mensaje.txt");
    console.log(`
    Este es el contenido anterior:
    ${respuesta}
    
    Este es el nuevo contenido:
    ${respuestaActual}
    `);
};

main();
