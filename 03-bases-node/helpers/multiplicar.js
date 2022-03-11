const fs = require("fs");

/**
 * Crea un archivo de multiplicación
 * @param {number} base
 * @returns El nombre del archivo creado
 */
const crearArchivo = async (base = 5) => {
  salida = obtenerCadenaMultiplicacion(base);
  console.log(salida);
  try {
    let nombreArchivo = `tabla-${base}.txt`;
    fs.writeFileSync(nombreArchivo, salida);
    return nombreArchivo;
  } catch (e) {
    throw e;
  }
};

/**
 * Genera la cadena de la multiplicación
 * @param {number} base
 * @returns La cadena de la multiplicación
 */
const obtenerCadenaMultiplicacion = (base) => {
  let salida = "";
  for (let i = 1; i <= 10; i++) {
    salida += `${base} x ${i} = ${base * i}\n`;
  }
  return salida;
};

module.exports = {
  crearArchivo,
};
