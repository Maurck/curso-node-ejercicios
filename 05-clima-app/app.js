require('dotenv').config();

const {
  leerInput,
  inquirerMenu,
  inquirerPausa,
  listarLugares
} = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async () => {
  const busquedas = new Busquedas();
  let opt;
  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        //Mostrar mensaje
        const lugar = await leerInput("Ciudad: ");

        //Buscar los lugares

        const lugares = await busquedas.ciudad(lugar);
        
        //Seleccionar el lugar
        
        const id = await listarLugares(lugares);
        if(id === '0') continue;

        const lugarSel = lugares.find(l => l.id === id);

        busquedas.agregarHistoral(lugarSel.nombre);

        //Encontrar clima
        const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lon);

        //Mostrar resultados
        console.log("\nInformación de la ciudad\n".green);
        console.log("Ciudad:", lugarSel.nombre);
        console.log("Lat:", lugarSel.lat);
        console.log("Lon:", lugarSel.lon);
        console.log("Temperatura:", clima.temp);
        console.log("Minima:", clima.temp_min);
        console.log("Máxima:", clima.temp_max);
        console.log("Como está el clima:", clima.desc);
        break;

      case 2:

      busquedas.historialCapitalizado.forEach((ciudad,i) => {
        idx = `${i+1}.`.green;
        console.log(`${idx} ${ciudad}`)
      })
      
        break;
    }

    if (opt !== 0) await inquirerPausa();
  } while (opt !== 0);
};

main();
