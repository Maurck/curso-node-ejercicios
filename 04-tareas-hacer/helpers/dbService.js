fs = require('fs');

const rutaArchivo = './db/data.json';

const guardarDB = (data) => {
    fs.writeFileSync(rutaArchivo, JSON.stringify(data));
}

const leerDB = () => {
    if(!fs.existsSync(rutaArchivo)){
        return null;
    }

    const info = fs.readFileSync(rutaArchivo, {encoding: 'utf8'});
    const data = JSON.parse(info);

    return data;
}

module.exports = {
    guardarDB,
    leerDB
}