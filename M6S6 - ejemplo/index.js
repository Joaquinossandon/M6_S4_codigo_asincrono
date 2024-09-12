const yargs = require("yargs");
const saludar = require("./comandos/saludar");
const despedir = require("./comandos/despedir");

const args = yargs
    .command(...saludar) // spead operator
    .command(...despedir)
    .help().argv;