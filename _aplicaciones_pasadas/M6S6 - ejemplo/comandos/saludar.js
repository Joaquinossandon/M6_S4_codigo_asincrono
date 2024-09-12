const config = {
    nombre: {
        description: "agrega el nombre para saludar",
        alias: "n",
        demandOption: true,
    },
};

const ejecuta = ({ nombre }) => {
    console.log(`Hola ${nombre}`);
};

module.exports = ["saludar", "saludar al programador", config, ejecuta];
