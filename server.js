// Implementar una aplicación para una librería.
// esta app, debe realizar las siguientes tareas:

// - Agregar un libro
// - Eliminar un libro
// - Editar un libro
// - Listar los libros
// - Listar los libros por autor (mostrar sólo los libros de X autor)
// - Listar un libro por id
// - listar libros por precio (rango de precio, min y max)

// Usa express para realizar los endpoints necesarios de esta app

// usa este esquema de libros para tus pruebas:
// {
//     id: 1,
//     titulo: "El señor de los anillos",
//     autor: "J.R.R. Tolkien",
//     precio: 500,
//     editorial: "Minotauro"
// }

// la app guardará en un archivo JSON un arreglo de libros, el cual deberas
// leer y escribir cada vez que se realice una operación y de esta forma manejar el arreglo.

// Es importante mencionar que no necesitamos interfaz gráfica, sólo los endpoints con su funcionalidad.

// ✅ Crea un archivo llamado libros.json con un arreglo vacío.
// ✅ importa express para poder crear el servidor
// ✅ Intancia express para poder usar sus métodos
// ✅ Crea un endpoint para agregar un libro
// ------✅ Leer el archivo
// ------✅ Transformar a un JSON
// ------✅ Agregar el libro al JSON
// ------✅ Escribir en el archivo
// ✅ Crea un endpoint para eliminar un libro
// ✅ Crea un endpoint para editar un libro
// ✅ Crea un endpoint para listar los libros
// ---- ✅ Leer el archivo
// --------- ✅ Convertir el resultado a JSON
// ✅ Crea un endpoint para listar los libros por autor
// ✅ Crea un endpoint para listar un libro por id
// ✅ Crea un endpoint para listar libros por precio
// ✅ Escucha en el puerto 8000

// ! No olvidar que para usar el body de nuestras peticiones
// ! debemos usar el middleware express.json()

const fs = require("fs/promises");
const express = require("express");
const { randomUUID } = require("crypto");
const app = express();

app.use(express.json());

// verbos HTTP => GET POST PUT DELETE
app.get("/libros", async (req, res) => {
    const fileContent = await fs.readFile("libros.json", "utf-8"); // ESTO VIENE COMO STRING
    const fileContentJSON = JSON.parse(fileContent);
    res.status(200).json({
        msg: fileContentJSON.length ? "Lista de libros" : "No hay libros",
        result: fileContentJSON,
    });
});

app.post("/libros", async (req, res) => {
    const libro = req.body;
    const fileContent = await fs.readFile("libros.json", "utf-8"); // ESTO VIENE COMO STRING
    const fileContentJSON = JSON.parse(fileContent); // ESTE JSON ES UN ARRAY
    // leer el largo del arreglo actual + 1 para el nuevo ID
    // const id = fileContentJSON.length + 1;
    const id = randomUUID();
    fileContentJSON.push({ id, ...libro });

    await fs.writeFile(
        "libros.json",
        JSON.stringify(fileContentJSON, null, 2),
        "utf-8"
    );
    res.status(201).json(libro);
});

app.get("/libros/:id", (req, res) => {
    const { id } = req.params;
    res.status(200).send(`Aquí está el libro con el ID ${id}`);
});

app.delete("/libros/:id", (req, res) => {
    const { id } = req.params;
    res.status(200).send(`libro con el ID ${id}, eliminado`);
});

app.put("/libros/:id", (req, res) => {
    const { id } = req.params; // params es un objeto {}, en este caso sólo trae el id => {id: valor}
    res.status(200).send(`El libro con el ID ${id}, ha sido actualizado.`);
});

app.get("/libros/autor/:autor", async (req, res) => {
    const { autor } = req.params;
    const fileContent = await fs.readFile("libros.json", "utf-8"); // ESTO VIENE COMO STRING
    const fileContentJSON = JSON.parse(fileContent); // ESTE JSON ES UN ARRAY
    const librosAutor = fileContentJSON.filter(
        (libro) => libro.autor === autor
    );
    res.status(200).json({
        msg: `libros de ${autor}`,
        result: librosAutor,
    });
});

app.get("/libros/filtro/precio", (req, res) => {
    const { min, max } = req.body;
    res.status(200).send(
        `Estos son los libros con el precio entre ${min} y ${max}`
    );
});

app.listen(8000, () => {
    console.log("El servidor se ejecuta en http://localhost:8000/");
});


// Terminar la aplicación y modularizarla lo más posible
// mañana vamos a revisar los resultados