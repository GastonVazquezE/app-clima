const API = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = '33b8ead125e99a914705f8ef9196a2b2';

function kelvinACelcius(temp){
    return Math.floor(temp - 273,15); 
}


document.getElementById('btnBuscar').addEventListener('click', () => {
    let ciudad = document.getElementById('inputCiudad').value;

    if(ciudad){
        fetch(`${API}?q=${ciudad}&appid=${API_KEY}`)
        .then(data => data.json())
        .then(data => muestraBusqueda(data))
    }
})


function muestraBusqueda(data) {
    console.log(data);
    const divDatosClima = document.getElementById('datosClima');
    divDatosClima.innerHTML = '';

    let ciudad = data.name
    let pais = data.sys.country
    let temperatura = data.main.temp
    let sensacionTermica = data.main.feels_like
    let tempMax = data.main.temp_max
    let tempMin = data.main.temp_min
    let descripcion = data.weather[0].description
    let icono = data.weather[0].icon

    const nombreCiudad = document.createElement('h2');
    nombreCiudad.classList.add('nombre-ciudad');
    nombreCiudad.textContent = `${ciudad}, ${pais}`;
    divDatosClima.appendChild(nombreCiudad);

    const temp = document.createElement('p');
    temp.classList.add('temp');
    temp.textContent = `${kelvinACelcius(temperatura)}°C - ST: ${kelvinACelcius(sensacionTermica)}°C`;
    divDatosClima.appendChild(temp);

    const maxmin = document.createElement('p');
    maxmin.classList.add('maxmin')
    maxmin.textContent = `Min: ${kelvinACelcius(tempMin)}°C - Max: ${kelvinACelcius(tempMax)}°C`;
    divDatosClima.appendChild(maxmin);

    const icon = document.createElement('img');
    icon.src = `https://openweathermap.org/img/wn/${icono}@2x.png`
    divDatosClima.appendChild(icon);

    const desc = document.createElement('p');
    desc.classList.add('desc');
    desc.textContent = descripcion;
    divDatosClima.appendChild(desc);
}