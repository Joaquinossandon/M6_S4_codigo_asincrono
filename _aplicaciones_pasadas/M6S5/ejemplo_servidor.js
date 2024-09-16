const http = require("http");

const server = http.createServer((req, res) => {
    console.log(req.method, req.url);
    req.on("data", (data) => {
        console.log(JSON.parse(data))
    });
    if (req.method === "GET" && req.url === '/ver') {
        res.write("Revisando lo que hay en un archivo");
    } 
    if (req.method === "GET" && req.url === '/ver/id') {
        res.write("Revisando solo un elemento");
    } 
    
    
    // else if (req.method === "POST") {
    //     res.write("Creando cositas");
    // } else if (req.method === "PUT") {
    //     res.write("Editando cositas");
    // } else if (req.method === "DELETE") {
    //     res.write("Eliminando cositas");
    // }
    // console.log("Se hizo una petición");
    res.end();
    // process.exit()
});

server.listen(8000, () => {
    console.log("Servidor escuchando en el puerto 8000");
});
