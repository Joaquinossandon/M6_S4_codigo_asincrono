const fs = require("fs"); // importamos el módulo file system (fs) de nodejs

fs.readFile("texto1.txt", "utf8", (err, texto1) => {
    if (err) {
        return console.log(err);
    }
    fs.readFile(texto1, "utf8", (err, texto2) => {
        if (err) {
            return console.log(err);
        }
        fs.readFile(texto2, "utf8", (err, texto3) => {
            if (err) {
                return console.log(err);
            }
            console.log(texto3);
        });
    });
});

// estamos en break, volvemos a las 10:10
