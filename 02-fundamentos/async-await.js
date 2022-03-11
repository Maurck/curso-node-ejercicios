const empleados = [
  {
    id: 1,
    nombre: "Mauricio",
  },
  {
    id: 2,
    nombre: "Sebastian",
  },
  {
    id: 3,
    nombre: "Leonardo",
  },
];

const salarios = [
  {
    id: 1,
    salario: 1000,
  },
  {
    id: 2,
    salario: 1500,
  },
];

const getEmpleado = (id) => {
  return new Promise((resolve, reject) => {
    const empleado = empleados.find((e) => e.id === id)?.nombre;

    empleado ? resolve(empleado) : reject(`No existe empleado con el id ${id}`);
  });
};

const getSalario = (id) => {
  return new Promise((resolve, reject) => {
    const salario = salarios.find((s) => s.id === id)?.salario;

    salario ? resolve(salario) : reject(`No existe salario con el id ${id}`);
  });
};

const id = 1;

const getInfoUsuario = async (id) => {

  try {
    const empleado = await getEmpleado(id);
    const salario = await getSalario(id);
  
    return `El salario del empleado ${empleado} es ${salario} USD`;
  }
  catch (err) {
    throw err;
  }
};

getInfoUsuario(id)
.then((msg) => console.log(msg))
.catch((err) => console.log(err));