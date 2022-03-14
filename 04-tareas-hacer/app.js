require("colors");
const {
  inquirerMenu,
  inquirerPausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
	mostrarListadoChecklist
} = require("./helpers/inquirer");
const Tareas = require("./models/tareas");
const { guardarDB, leerDB } = require("./helpers/dbService");

console.clear();

const main = async () => {
  let opt = "";
  const tareas = new Tareas();

  const tareasDB = leerDB();

  if (tareasDB) {
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    //   Imprime el menú
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        //  Crear opcion
        const desc = await leerInput("Descripción: ");
        tareas.crearTarea(desc);
        break;

      case "2":
        tareas.listadoCompleto();
        break;

      case "3":
        tareas.listarCompletadas();
        break;

      case "4":
        tareas.listarPendientes();
        break;

			case "5":
				ids = await mostrarListadoChecklist(tareas.listadoArr);
				tareas.toggleCompletadas(ids);

				break;

      case "6":
        const id = await listadoTareasBorrar(tareas.listadoArr);

        if (id !== "0") {
          const confirmation = await confirmar("¿Está seguro?");
          if (confirmation) {
            tareas.borrarTarea(id);
          }
        }
        break;
    }

    guardarDB(tareas.listadoArr);

    if (opt !== "0") await inquirerPausa();
  } while (opt !== "0");

};

main();
