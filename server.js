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
// ---- ✅🔁 Leer el archivo
// ---- ✅🔁 Transformar a un JSON
// ---- ✅ Agregar el libro al JSON
// ---- ✅🔁 Escribir en el archivo
// ---- ✅🔁 Envía una respuesta formateada con el contenido del archivo
// ✅ Crea un endpoint para eliminar un libro
// ---- ✅🔁 Leer el archivo
// ---- ✅🔁 Transformar a un JSON
// ---- ✅ Editar el JSON y eliminar el libro con el id recibido
// ---- ✅🔁 Escribir en el archivo
// ---- ✅🔁 Envía una respuesta formateada con el contenido del archivo
// ✅ Crea un endpoint para editar un libro
// ---- ✅🔁 Leer el archivo
// ---- ✅🔁 Transformar a un JSON
// ---- ✅ Editar el JSON en la posición del libro con el id recibido
// ---- ✅🔁 Escribir en el archivo
// ---- ✅🔁 Envía una respuesta formateada con el contenido del archivo
// ✅ Crea un endpoint para listar los libros
// ---- ✅🔁 Leer el archivo
// ---- ✅🔁 Convertir el resultado a JSON
// ---- ✅🔁 Envía una respuesta formateada con el contenido del archivo
// ✅ Crea un endpoint para listar los libros por autor
// ---- ✅🔁 Leer el archivo
// ---- ✅🔁 Convertir el contenido a JSON
// ---- ✅ Filtrar los libros según el autor que se entrega en los params
// ---- ✅🔁 Envía una respuesta formateada con el contenido del archivo
// ✅ Crea un endpoint para listar un libro por id
// ---- ✅ Leemos los params que vienen en la URL (en este caso en la propiedad 'id')
// ---- ✅🔁 Leer el archivo
// ---- Buscar coincidencias con el ID que llegó de params
// ✅ Crea un endpoint para listar libros por rango de precio
// ---- ✅🔁 Leer el archivo
// ---- ✅🔁 Convertir el contenido a JSON
// ---- ✅ Filtrar los libros según el precio minimo y maximo que se entrega en el body de la solicitud
// ---- ✅🔁 Envía una respuesta formateada con el contenido filtrado

// ✅ Escucha en el puerto 8000

// ! No olvidar que para usar el body de nuestras peticiones
// ! debemos usar el middleware express.json()

const fs = require("fs/promises");
const express = require("express");
const { randomUUID } = require("crypto");
const cors = require("cors");
const hbs = require("hbs");
const path = require("path");
const app = express();

hbs.registerPartials(__dirname + "/views/partials", (err) => {});

app.set("view engine", "hbs");

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.get("/", async (req, res) => {
    const fileContent = await fs.readFile("libros.json", "utf-8"); // ESTO VIENE COMO STRING
    const fileContentJSON = JSON.parse(fileContent);
    res.render("index", {
        titulo: "Lista de libros",
        libros: fileContentJSON,
        tieneLibros: Boolean(fileContentJSON.length),
        layout: "main",
    });
});

app.get("/libro/:id", async (req, res) => {
    const { id } = req.params;
    const fileContent = await fs.readFile("libros.json", "utf-8"); // ESTO VIENE COMO STRING
    const fileContentJSON = JSON.parse(fileContent);
    const libroEncontrado = fileContentJSON.find((libro) => libro.id == id);
    res.render("libro", {
        libro: libroEncontrado,
        titulo: libroEncontrado.titulo,
        layout: "main",
    });
});

app.get("/addLibro", async (req, res) => {
    res.render("addLibro", { layout: "main" });
});

// verbos HTTP => GET POST PUT DELETE => CRUD => CREATE READ UPDATE DELETE
app.get("/libros", async (req, res) => {
    const fileContent = await fs.readFile("libros.json", "utf-8"); // ESTO VIENE COMO STRING
    const fileContentJSON = JSON.parse(fileContent);
    res.status(200).json({
        msg: fileContentJSON.length ? "Lista de libros" : "No hay libros",
        result: fileContentJSON,
    });
});

// req es request => petición
app.post("/libros", async (req, res) => {
    const libro = req.body; // viene titulo, autor, precio, editorial (informacion que envía en usuario)
    const fileContent = await fs.readFile("libros.json", "utf-8"); // ESTO VIENE COMO STRING
    const fileContentJSON = JSON.parse(fileContent); // ESTE JSON ES UN ARRAY
    // leer el largo del arreglo actual + 1 para el nuevo ID
    // const id = fileContentJSON.length + 1;
    const id = randomUUID(); // otra forma de generar este id es con la libreria uuid
    fileContentJSON.push({ id, ...libro }); // => .push({id, titulo, autor, precio, editorial})

    await fs.writeFile(
        "libros.json",
        JSON.stringify(fileContentJSON, null, 2),
        "utf-8"
    );
    res.redirect(301, "/");
});

app.get("/libros/:id", async (req, res) => {
    const { id } = req.params; // {id: valor}
    const fileContent = await fs.readFile("libros.json", "utf-8"); // ESTO VIENE COMO STRING
    const fileContentJSON = JSON.parse(fileContent); // ESTE JSON ES UN ARRAY
    const libroEncontrado = fileContentJSON.find((libro) => libro.id == id); // devuelve el elemento => {...libro} o undefined (truthly o falsy respectivamente)
    res.status(libroEncontrado ? 200 : 404).json({
        msg: libroEncontrado ? "Libro encontrado" : "No se encontró el libro",
        result: libroEncontrado, // en el caso de que sea undefined, no lo vamos a ver en la respuesta del cliente
    });
});

app.delete("/libros/:id", async (req, res) => {
    const { id } = req.params;
    const fileContent = await fs.readFile("libros.json", "utf-8"); // ESTO VIENE COMO STRING
    const fileContentJSON = JSON.parse(fileContent); // ESTE JSON ES UN ARRAY
    const indexEncontrado = fileContentJSON.findIndex(
        (libro) => libro.id == id
    ); // devuelve el índice del elemento actual o -1 si no lo encuentra
    if (indexEncontrado != -1) {
        const [libroEliminado] = fileContentJSON.splice(indexEncontrado, 1); // retorna => [{...libro}]
        await fs.writeFile(
            "libros.json",
            JSON.stringify(fileContentJSON, null, 2),
            "utf-8"
        );
        res.status(200).json({
            msg: "Libro eliminado",
            result: libroEliminado,
        });
    } else {
        res.status(404).json({
            msg: `Libro con el id ${id}, no existe`,
        });
    }
});

app.put("/libros/:id", async (req, res) => {
    const { id } = req.params; // params es un objeto {}, en este caso sólo trae el id => {id: valor}
    const libroEditado = req.body;
    console.log(libroEditado, "LIBRO EDITADO desde body");
    // leer el archivo
    const fileContent = await fs.readFile("libros.json", "utf-8"); // ESTO VIENE COMO STRING
    const fileContentJSON = JSON.parse(fileContent); // ESTE JSON ES UN ARRAY
    // Editar el JSON en la posición del libro con el id recibido
    const indexEncontrado = fileContentJSON.findIndex(
        (libro) => libro.id == id
    ); // devuelve el índice del elemento actual o -1 si no lo encuentra
    if (indexEncontrado != -1) {
        fileContentJSON.splice(indexEncontrado, 1, { id, ...libroEditado });
        // qué pasa si no le mandamos el libro completo? es decir, si solo enviamos el titulo?
        // ARREGLAR ESTA SITUACION
        await fs.writeFile(
            "libros.json",
            JSON.stringify(fileContentJSON, null, 2),
            "utf-8"
        );
        const newContent = await fs.readFile("libros.json", "utf-8"); // ESTO VIENE COMO STRING
        const newContentJSON = JSON.parse(newContent); // ESTE JSON ES UN ARRAY
        res.status(200).json({
            msg: "Libro editado",
            result: newContentJSON[indexEncontrado],
        });
    } else {
        res.status(404).json({
            msg: `Libro con el id ${id}, no existe`,
        });
    }
});

app.get("/libros/autor/:autor", async (req, res) => {
    const { autor } = req.params; // {autor: "J.K. Rowling"}
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

app.get("/libros/filtro/precio", async (req, res) => {
    const { min, max } = req.body; // {min: valor, max: valor}
    const fileContent = await fs.readFile("libros.json", "utf-8"); // ESTO VIENE COMO STRING
    const fileContentJSON = JSON.parse(fileContent); // ESTE JSON ES UN ARRAY

    // Que pasa si el minimo es mayor que el máximo?
    // ALTERNATIVAS DE SOLUCION
    //1. para solucionar podemos hacer que el minimo no sea mayor que el máximo
    //2. ó que dados ambos valores el mínimo sea el número menor y el máximo el mayor
    const librosFiltrados = fileContentJSON.filter(
        (libro) => libro.precio >= min && libro.precio <= max
    );
    res.status(200).json({
        msg: `libros entre ${min} y ${max}`,
        result: librosFiltrados,
    });
});

app.listen(8000, () => {
    console.log("El servidor se ejecuta en http://localhost:8000/");
});

module.exports = { app };
