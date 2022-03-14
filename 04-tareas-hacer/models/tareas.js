const Tarea = require("./Tarea");

class Tareas {
  _listado = {};

  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });

    return listado;
  }

  constructor() {
    this._listado = {};
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  borrarTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  listadoCompleto() {
    let tareasCadena = "\n";
    this.listadoArr.forEach((tarea, i) => {
      tareasCadena += `${(i + 1).toString().green}. ${tarea.desc} : `;

      tarea.completadoEn
        ? (tareasCadena += `${"Completada".green} : ${
            tarea.completadoEn.green
          }`)
        : (tareasCadena += `${"Pendiente".red}`);

      tareasCadena += "\n";
    });

    console.log(tareasCadena);
  }

  listarPendientes() {
    let tareasCadena = "\n";
    this.listadoArr.forEach((tarea, i) => {
      if (!tarea.completadoEn) {
        tareasCadena += `${(i + 1).toString().green}. ${tarea.desc} : ${
          "Pendiente".red
        }`;

        tareasCadena += "\n";
      }
    });

    console.log(tareasCadena);
  }

  listarCompletadas() {
    let tareasCadena = "\n";
    this.listadoArr.forEach((tarea, i) => {
      if (tarea.completadoEn) {
        tareasCadena += `${(i + 1).toString().green}. ${tarea.desc} : ${
          "Completada".green
        }`;

        tareasCadena += "\n";
      }
    });

    console.log(tareasCadena);
  }

  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });

    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }
}

module.exports = Tareas;
