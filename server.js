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

// - Crea un archivo llamado libros.json con un arreglo vacío.
// - importa express para poder crear el servidor
// - Intancia express para poder usar sus métodos
// - Crea un endpoint para agregar un libro
// - Crea un endpoint para eliminar un libro
// - Crea un endpoint para editar un libro
// - Crea un endpoint para listar los libros
// - Crea un endpoint para listar los libros por autor
// - Crea un endpoint para listar un libro por id
// - Crea un endpoint para listar libros por precio
// - Escucha en el puerto 8000

// ! No olvidar que para usar el body de nuestras peticiones
// ! debemos usar el middleware express.json()