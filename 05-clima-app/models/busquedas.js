const fs = require('fs');
const axios = require('axios');

class Busquedas {
    historial = [];
    dbPath = './db/database.json';

    constructor(){
        this.leerDB();
    }

    get historialCapitalizado(){
        return this.historial.map( lugar => {
            let palabras = lugar.split(' ');
            palabras = palabras.map(p => p[0].toUpperCase() + p.substring(1));

            return palabras.join(' ');
        })
    }

    get paramsMapbox(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'languaje': 'es',
            'proximity': 'ip'
        }
    }

    get paramsOpenWeather(){
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric',
            'lang':'es'
        }
    }

    async ciudad(lugar=''){

        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox 
            })
            const res = await instance.get();

            return res.data.features.map( lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lon: lugar.center[0],
                lat: lugar.center[1]
            }))

        }
        catch(e){
            console.log(e);
            return [];
        }
    }

    async climaLugar(lat, lon){

        let params = this.paramsOpenWeather;
        params['lat'] = lat;
        params['lon'] = lon;

        try{
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params
            })

            const res = await instance.get();

            return {
                'temp': res.data.main.temp,
                'temp_min': res.data.main.temp_min,
                'temp_max': res.data.main.temp_max,
                'desc': res.data.weather[0].description
            }

        }
        catch(e){
            console.log(e);
        }

    }

    agregarHistoral(lugar = ''){

        if(this.historial.includes(lugar.toLocaleLowerCase())){
            return;
        }

        this.historial = this.historial.splice(0, 5);

        this.historial.unshift(lugar.toLocaleLowerCase());

        this.guardarDB();

    }

    guardarDB(){

        const payload = {
            historial: this.historial
        }
        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    leerDB(){
        if(!fs.existsSync(this.dbPath)){
            return;
        }
    
        const info = fs.readFileSync(this.dbPath, {encoding: 'utf8'});
        const data = JSON.parse(info).historial;
    
        this.historial = data;
    }
}

module.exports = Busquedas;