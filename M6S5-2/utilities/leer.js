const fs = require("fs/promises");

const leerArchivo = async (nombreArchivo) => {
    try {
        const resultado = await fs.readFile(nombreArchivo, "utf-8");
        return resultado;
    } catch (error) {
        console.error(error);
    }
};

const JsonParse = (string) => {
    return JSON.parse(string);
};

const fileToJSON = async (fileName) => {
    try {
        const contentString = await leerArchivo(fileName);
        console.log(contentString)
        const JsonContent = JsonParse(contentString);
        return JsonContent;
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    fileToJSON,
};
