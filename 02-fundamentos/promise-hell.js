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

id = 1;

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

// getEmpleado(id)
//   .then((empleado) => console.log(empleado))
//   .catch((err) => console.log(err));

// getSalario(id)
//   .then((salario) => console.log(salario))
//   .catch((err) => console.log(err));

getEmpleado(id)
.then(empleado => {
    getSalario(id)
    .then(salario => {
        console.log('El empleado:', empleado, 'tiene un salario de', salario, 'USD');
    })
    .catch(err => console.log(err));
})
.catch((err) => console.log(err));