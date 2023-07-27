const api = {
    key: "64ed82577ced7f69cb1687f0ce536131",
    base: "https://api.openweathermap.org/data/2.5/",
    lang: "pt_br",
    units: "metric"
}

const city = document.querySelector('.city')
const date = document.querySelector('.date');
const container_img = document.querySelector('.container-img');
const container_temp = document.querySelector('.container-temp');
const temp_number = document.querySelector('.container-temp div');
const temp_unit = document.querySelector('.container-temp span');
const weather_t = document.querySelector('.weather');
const search_input = document.querySelector('.form-control');
const search_button = document.querySelector('.btn');
const low_high = document.querySelector('.low-high');
const cor_temp = document.querySelector('.hottemp');
const clima = document.querySelector('card-body');
const sol_limpo ='sol_limpo';
const neve= 'neve';
const nublado_nuvem ='nublado_nuvem';
const tempestade = 'tempestade';
const chuva_chuva = 'chuva_chuva';
const tempo_mist = 'tempo_mist';


window.addEventListener('load', () => {
    //resultado da localização informada pelo browser
    //if ("geolocation" in navigator)
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPosition, showError);
    }
    else {
        alert('navegador não suporta geolozalicação');
    }
    function setPosition(position) {
        console.log(position)
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        coordResults(lat, long);
    }
    function showError(error) {
        alert(`erro: ${error.message}`);
    }
})
//pegas as coordenadas disponibilizadas pelo localizador do browser
function coordResults(lat, long) {
    $.ajax({
        type: "GET",
        url: `${api.base}weather?lat=${lat}&lon=${long}&lang=${api.lang}&units=${api.units}&APPID=${api.key}`,
        success: function (response) {
            displayResults(response);
     
        },
        error: function (msg) {
            

        }
    });
  
}
//função de click para iniciar a busca do que foi digitado no campo de pesquisa
search_button.addEventListener('click', function() {
    searchResults(search_input.value)
})
//evento keypress, tecla 13 = tecla enter.
search_input.addEventListener('keypress', enter)
function enter(event) {
    key = event.keyCode
    if (key === 13) {
        searchResults(search_input.value)
    }
}
//requisição por metodo fetch, retornando em promes.
function searchResults(city) {
    $.ajax({
        type: "GET",
        url: `${api.base}weather?q=${city}&lang=${api.lang}&units=${api.units}&APPID=${api.key}`,
        success: function (response) {
            displayResults(response)
        },
        error: function () {
            alert("Cidade não encontrada")
            

        }
        
        });
}
//mostra os valores na tela
function displayResults(weather) {
    //cria uma log para mostrar o retorno das funções no cosole do browser (F12)
    console.log(weather)

    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    date.innerText = dateBuilder(now);
    //altera o icone conforme o clima do local. ex nublado mostra uma nuvem.
    let iconName = weather.weather[0].icon;
    container_img.innerHTML = `<img src="./icons/${iconName}.png">`;

    let temperature = `${Math.round(weather.main.temp)}`
    temp_number.innerHTML = temperature;
    temp_unit.innerHTML = `°c`;

    weather_tempo = weather.weather[0].description;
    weather_t.innerText = capitalizeFirstLetter(weather_tempo)
    //requisição que busca a minima e maxima temperatura do dia.
    low_high.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
    imagemfundo(weather);
}

function dateBuilder(d) {
    let days = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    let months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    let day = days[d.getDay()]; //getDay: 0-6
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
}
//requisição de alteração modo de temperatura de celsius ou farenheit.
container_temp.addEventListener('click', changeTemp)
function changeTemp() {
    temp_number_now = temp_number.innerHTML

    if (temp_unit.innerHTML === "°c") {
        let f = (temp_number_now * 1.8) + 32
        temp_unit.innerHTML = "°f"
        temp_number.innerHTML = Math.round(f)
    }
    else {
        let c = (temp_number_now - 32) / 1.8
        temp_unit.innerHTML = "°c"
        temp_number.innerHTML = Math.round(c)
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function colortemp(temperature){

    if (temperature >= '18' )
        return cor_temp();

    else (temperature <= 17)
    return error();

}
//remove as classes para que não gere erro no clima atual.
function removefundo(imagemfundo){
    imagemfundo.classList.remove('nublado_nuvem');
    imagemfundo.classList.remove('sol_limpo');
    imagemfundo.classList.remove('chuva_chuva');
    imagemfundo.classList.remove('neve');
    imagemfundo.classList.remove('tempestade');
    imagemfundo.classList.remove('tempo_mist');
}
//adciona imagem de fundo do clima atual.
function imagemfundo(weather){

    var fundo = document.getElementById('fundo_todo');
    removefundo(fundo)
    var clima = weather.weather[0].main;
    

   
    if (clima == 'Clear'){
        fundo.classList.add(sol_limpo);
        return sol_limpo;}
    
    else if (clima =='Rain'){
        fundo.classList.add(chuva_chuva);
        return chuva_chuva;}

    else if (clima=='Thunderstorm'){
        fundo.classList.add(tempestade);
        return tempestade;}

    else if (clima=='Snow'){
        fundo.classList.add(neve);
        return neve;}

    else if (clima=='Mist'){
      
        fundo.classList.add(tempo_mist);
        return tempo_mist;}
        
    else if (clima =='Clouds'){
        fundo.classList.add(nublado_nuvem);
        return nublado_nuvem;}
    
//florianopolis

}

