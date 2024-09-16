const yargs = require("yargs");
const agregar = require("./commands/agregar");
const eliminar = require("./commands/eliminar");
const listar = require("./commands/listar");
const editar = require("./commands/editar");

const args = yargs
    .command(...agregar) // .command("create", "Crea una nueva tarea", config, agregarTarea)
    .command(...eliminar)
    .command(...listar)
    .command(...editar)
    .help().argv;
