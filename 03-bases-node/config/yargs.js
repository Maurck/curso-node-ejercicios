const argv = require("yargs")
  .options({
    'b': {
      alias: "base",
      type: "number",
      demandOption: true,
      describe: "Es la base de la tabla de multiplicar"
    },
    'l': {
        alias: "listar",
        type: "boolean",
        default: false,
        optional: true,
        describe: "Muestra la tabla en consola"
    },
    'h': {
      alias: "hasta",
      type: "number",
      optional: true,
      describe: "Representa hasta donde llega la tabla de multiplicar",
      default: 10
    }
  })
  .check((argv, options) => {
    if (isNaN(argv.b)) {
      throw "La base tiene que ser un numero";
    }
    if (isNaN(argv.h)) {
        throw "El hasta tiene que ser un numero";
    }
    
    return true;
  }).argv;
  
module.exports = argv;