// flooor 0.05 => 0 || 0.5 => 0 || 5.8 => 5
// const numAzar = Math.floor(Math.random() * 10); // numero random entre 0.000..1 - 0.999...
// console.log(numAzar);

// const promesa = new Promise((resolve, reject) => {
//     if (numAzar > 7) {
//         reject("La promesa falló");
//     } else {
//         resolve("El numero es menor a 7");
//     }
// });

// promesa
//     .then((res) => {
//         console.log("PROMESA CUMPLIDA");
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log("PROMESA FALLIDA");
//         console.log(err);
//     })
//     .finally(() => {
//         console.log("Se terminó la ejecución");
//     });

const fs = require("fs/promises");

fs.readFile("texto1.txt", "utf8")
    .then((texto1) => fs.readFile(texto1, "utf8")) // texto1 => texto2.txt
    .then((texto2) => fs.readFile(texto2, "utf8")) // texto2 => texto3.txt
    .then((texto3) => console.log(texto3)) // texto3 => bienvenido a cbh...
    .catch((error) => console.log(error))
    .finally(() => {
        console.log("Terminamos");
    });

fs.readFile("persona.json", "utf8").then((res) => console.log(JSON.parse(res)));
