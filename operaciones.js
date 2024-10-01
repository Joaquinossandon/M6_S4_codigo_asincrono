// operaciones de suma y resta

function suma(a, b) {
    if(isNaN(a) || isNaN(b)) {
        return "Ingresa un numero"
    }
    return Number(a) + Number(b);
}

function resta(a, b) {
    return a - b;
}

module.exports = { suma, resta };
