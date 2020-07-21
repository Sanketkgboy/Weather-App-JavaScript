// api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}

const weatherApi = {
    // This key is generated when I created my account on openweathermap
    key: "915a3fa9e91b31c7ea8b1097bc660d17",
    // base url is sliced from the full api key
    baseUrl: "https://api.openweathermap.org/data/2.5/weather?"
}

const searchInputBox = document.getElementById('input-box')

// When enter key is pressed the input box value is captured and passed to getWeatherReport
searchInputBox.addEventListener('keypress', (e) => {
    if(e.keyCode == 13){
        getWeatherReport(searchInputBox.value)
    }
})


// Fetch datafrom the api and create JSON object
function getWeatherReport(city){
    fetch(`${weatherApi.baseUrl}q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather => {
        return weather.json();
    }).then(showWeatherReport);
}


// Update values of fields by using data from JSON object 
function showWeatherReport(weather){
    console.log(weather)
    let city = document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`
    
    let temp =  document.getElementById('temp');
    temp.innerHTML =`${Math.round(weather.main.temp)}&deg;C`
    
    let minMaxTemp =  document.getElementById('min-max');
    minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min) / 
    ${Math.ceil(weather.main.temp_max)}&deg;C (max)`
    
    let weatherType = document.getElementById('weather')
    weatherType.innerText = weather.weather[0].main

    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);

    // Conditions to change background image on the basis of weather status
    if(weatherType.textContent == 'Clear'){
        document.body.style.backgroundImage = "url('images/clear.jpg')";
    } else if(weatherType.textContent == 'Clouds'){
        document.body.style.backgroundImage = "url('images/cloudy.jpg')";
    } else if(weatherType.textContent == 'Haze'){
        document.body.style.backgroundImage = "url('images/haze.jpg')";
    } else if(weatherType.textContent == 'mist'){
        document.body.style.backgroundImage = "url('images/mist.jpg')";
    } else if(weatherType.textContent == 'Sunny'){
        document.body.style.backgroundImage = "url('images/sunny.jpg')";
    } else if(weatherType.textContent == 'Rain'){
        document.body.style.backgroundImage = "url('images/rainy.jpg')";
    } else if(weatherType.textContent == 'Snow'){
        document.body.style.backgroundImage = "url('images/snow.jpg')";
    } else if(weatherType.textContent == 'Thunderstorm'){
        document.body.style.backgroundImage = "url('images/thunderstorm.jpg')";
    }
}


// Customize date for the UI 
function dateManage(dateArg) {

    let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 
    'Sunday'];

    let months = ["January", "February", "March", "April", "May", "June", "July", 
    "August", "September", "October", "November", "December"];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];
    return `${date} ${month} (${day}), ${year}`
}


