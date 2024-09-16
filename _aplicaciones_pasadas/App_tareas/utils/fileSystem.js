const fs = require("fs/promises");

// funciones base

// -- leer y escribir
const readFile = async () => {
    const contentStr = await fs.readFile("tareas.json", "utf-8");
    return contentStr;
};
const writeFile = async (content) => {
    await fs.writeFile("tareas.json", content, "utf-8");
    console.log("Se escribió el archivo");
};

// -- conversión
const convertToJson = (str) => {
    return JSON.parse(str);
};
const convertToString = (obj) => {
    return JSON.stringify(obj, null, 2);
};

// funciones consolidadas
const readFileAsJSON = async () => {
    const stringContent = await readFile();
    const JSONContent = convertToJson(stringContent);
    return JSONContent;
};

const writeFileFromJSON = async (json) => {
    const strContent = convertToString(json);
    await writeFile(strContent);
};

module.exports = {
    readFileAsJSON,
    writeFileFromJSON,
};
