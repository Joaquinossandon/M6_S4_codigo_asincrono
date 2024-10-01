const assert = require("chai").assert;
const { suma, resta } = require("../operaciones");

describe("Comprobar operaciones", () => {
    it("Verificar suma", () => {
        const resultadoSuma = suma(1, "1");

        assert.isNumber(resultadoSuma, "No es un numero");
        assert.equal(resultadoSuma, 2, `El resultado es: ${resultadoSuma}`);
    });
    it("La suma no puede recibir palabras", () => {
        const resultadoSuma = suma(1, "Jasjsajsa");
        assert.equal(resultadoSuma, "Ingresa un numero");
        // Test Driver development => TDD
        // TDD = se refiere a que la programacion o el desarrollo debe estar basado en los test
    });
    it("Verificar resta", () => {
        const resultadoResta = resta("2", 1);
        assert.isNumber(resultadoResta, "No es un numero");
        assert.strictEqual(
            resultadoResta,
            1,
            `El resultado es: ${resultadoResta}`
        );
    });
});
