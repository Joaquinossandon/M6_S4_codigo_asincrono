const http = require("http");

const server = http.createServer((req, res) => {
    console.log("Se hizo una petición");
    res.write("Hola caracola");
    res.end();
    process.exit()
});

server.listen(8000, () => {
    console.log("Servidor escuchando en el puerto 8000");
});
