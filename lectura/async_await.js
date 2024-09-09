const { leerTextoPlano } = require("./helper");

// async function hola() {
//     //... hago algo
// }
const leer = async () => {
    try {
        const texto1 = await leerTextoPlano("texto1.txt");
        const texto2 = await leerTextoPlano(texto1);
        const texto3 = await leerTextoPlano(texto2);

        console.log(texto3);
    } catch (error) {
        console.log(error);
    }
    return "No paró la ejecución";
};

leer().then((res) => console.log(res));
