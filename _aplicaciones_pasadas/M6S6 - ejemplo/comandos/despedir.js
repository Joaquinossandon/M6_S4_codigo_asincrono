const config = {
    nombre: {
        description: "coloca el nombre de la persona",
        demandOption: true,
        alias: "n",
    },
    gracioso: {
        description: "hace la despedición de forma jocosa",
        alias: "g",
    },
};

const ejecuta = ({ nombre, gracioso }) => {
    if (gracioso) {
        return console.log(`Hasta la vista ${nombre} baby`);
    }
    return console.log(`Nos vemos pronto, ${nombre}`);
};

module.exports = ["despedir", "despidete de una persona", config, ejecuta];
