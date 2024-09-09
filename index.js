const fs = require("fs/promises");
const axios = require("axios");

// generamos un numero aleatorio
const randomNumber = (max) => Math.floor(Math.random() * max); // si max fuese 10 sería un número entre 0 y 9.999 como tenemos floor sería un numero entre 0 y 9

// leemos un archivo y lo transformamos en JSON (arreglo en este caso)
const getFileJSON = async (filename) => {
    const data = await fs.readFile(filename, "utf8");
    return JSON.parse(data); // "[1,2,3,4,5]" => [1, 2, 3, 4, 5]
};

// de nuestro archivo (transformado en array) obtenemos uno de los valores de forma aleatoria
const getRandomValue = async () => {
    const data = await getFileJSON("data.txt");
    const number = randomNumber(data.length);
    return data[number];
};

// vamos a la api y obtenemos de forma aleatoria un recurso de la misma
const getResource = async () => {
    const value = await getRandomValue();
    const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/${value}`
    ); // sin await devuelve un Promise <pending>
    console.log(data);
    console.log(value);
};

getResource();

// diferencia entre data.json() y JSON.parse()

// data.json() cuando nosotros vemos a buscar infromacion a una api que devuelve un JSON
// nuestro body viene como un BUFFER, ese buffer, no es directamente legible
// por lo tando usamos data.json() para volver el body legible en el formato JSON

// JSON.parse, por otro lado, es para transformar un string a un formato JSON
// este string debe cumplir con la forma estructural de un JSON
// EJ: '{"nombre": "Juanin"}' es un string con el formato estructural de un JSON
// por lo que el resultado de transformarlo es => {"nombre": "Juanin"} (un objeto de JS)
