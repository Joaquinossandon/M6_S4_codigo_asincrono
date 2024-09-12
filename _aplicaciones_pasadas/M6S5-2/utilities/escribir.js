const fs = require("fs/promises");

const escribirArchivo = async (nombreArchivo, contenido) => {
    try {
        await fs.writeFile(nombreArchivo, contenido, "utf-8");
        return;
    } catch (error) {
        console.error(error);
    }
};

const JsonToString = (obj) => {
    return JSON.stringify(obj, null, 2);
};

const saveFile = async (fileName, contenido) => {
    try {
        const stringContent = JsonToString(contenido);
        escribirArchivo(fileName, stringContent);
        return;
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    saveFile,
};
