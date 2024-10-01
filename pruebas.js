const suma = (a, b) => {
    const numero1 = esNumero(a);
    const numero2 = esNumero(b);
    if ((numero1 !== 0 && numero2 !==0) && (!numero1 || !numero2)) {
        return "Inserta un número";
    }
    return numero1 + numero2;
};

const esNumero = (numero) => {
    if (isNaN(numero)) {
        return false;
    }
    return parseInt(numero);
};

console.log(suma(0, 5));
