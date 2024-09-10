const fs = require("fs/promises");

const leerTextoPlano = async (filename) => {
    return fs.readFile(filename, "utf8");
};

module.exports = {
    leerTextoPlano,
};
