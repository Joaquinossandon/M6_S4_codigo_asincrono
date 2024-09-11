const express = require("express");
const hbs = require("hbs");
const { fileToJSON } = require("./utilities/leer");
const { saveFile } = require("./utilities/escribir");
const app = express();
const port = 5000;

// configuracion HandleBars (HBS)
hbs.registerPartials(__dirname + "/views/partials", (err) => {});
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

// Servimos archivos estáticos en la carpeta public
app.use(express.static(__dirname + "/public"));

// RUTAS
app.get("/", async (req, res) => {
    const autos = await fileToJSON("autos.json");
    const keysAutos = Object.keys(autos);
    res.render("index", {
        autos: keysAutos,
    });
});

app.get("/ver/:marca", async (req, res) => {
    const { marca } = req.params;
    const autos = await fileToJSON("autos.json");
    res.render("auto", {
        auto: { ...autos[marca], marca },
        found: autos[marca] ? true : false,
    });
});

app.get("/eliminar/:marca", async (req, res) => {
    const { marca } = req.params;
    const autos = await fileToJSON("autos.json");
    delete autos[marca];
    await saveFile("autos.json", autos);
    const nuevosAutos = await fileToJSON("autos.json");
    console.log(nuevosAutos);
    const keysAutos = Object.keys(nuevosAutos);
    res.render("index", {
        autos: keysAutos,
    });
});

app.get("/:marca/:modelo/:asientos", async (req, res) => {
    const { marca, modelo, asientos } = req.params;
    const autos = await fileToJSON("autos.json");
    autos[marca] = { modelo, asientos: Number(asientos) };
    await saveFile("autos.json", autos);
    const nuevosAutos = await fileToJSON("autos.json");
    console.log(nuevosAutos, "HOLAAAA");
    const keysAutos = Object.keys(nuevosAutos);
    res.render("index", {
        autos: keysAutos,
    });
});

// Inicializacion del servidor
app.listen(port, () => {
    console.log(`Servidor ejecutandose en el puerto ${port}`);
});
