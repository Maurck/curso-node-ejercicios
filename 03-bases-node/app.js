const { crearArchivo } = require("./helpers/multiplicar");
const argv = require("./config/yargs");

console.clear();

// const [, , arg3 = 'base=5'] = process.argv;
// const [ , base = 5] = arg3.split('=');

// const base = 12;

crearArchivo(argv.b, argv.l, argv.h)
  .then((nombreArchivo) => console.log(nombreArchivo, "creado"))
  .catch((err) => console.log(err));
