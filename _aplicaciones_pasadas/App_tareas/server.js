const express = require("express");
const listarTareas = require("./utils/tareas/listarTareas");
const agregar = require("./utils/tareas/agregar");
const eliminar = require("./utils/tareas/eliminar");
// creamos una instancia de express
const app = express();

// le decimos a esta instancia
// que queremos un midleware que nos permita leer el body, en este caso, como un JSON
app.use(express.json());

// --- Definimos nuestras rutas ---

// Endpoint para obtener todas las tareas
app.get("/tareas", async (req, res) => {
    resultado = await listarTareas.allTasks();
    res.json(resultado);
});

// Endpoint para obtener una tarea por su id
app.get("/tareas/:taskId", async (req, res) => {
    const { taskId } = req.params;
    const resultado = await listarTareas.byId(taskId);
    const statusCode = resultado.error ? 404 : 200;
    res.status(statusCode).json(resultado);
});

// Endpoint para agregar una nueva tarea
app.post("/tareas", async (req, res) => {
    const tarea = req.body;
    const result = await agregar.add(tarea);
    res.status(201).json(result);
});

// Endpoint para eliminar una tarea por su id
app.delete("/tareas", async (req, res) => {
    const { taskId } = req.body;
    const result = await eliminar.remove(taskId)
    const statusCode = result.error ? 404 : 200
    res.status(statusCode).json(result)
});

// Endpoint para actualizar una tarea por su id
app.put("/tareas", () => {
    
})

app.listen(8000, () => {
    console.log("El servidor se está ejecutando");
});
