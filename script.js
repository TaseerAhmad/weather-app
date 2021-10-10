const refreshBt = document.getElementById('refresh');

window.onload = () => {
    updateDateData();
    getCurrentLocation();
};

refreshBt.onclick = () => {
    refreshBt.style.transitionDuration = '3s';
    refreshBt.style.transform = 'rotate(360deg)';
};

function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {

            const lat = position.coords.latitude;
            const long = position.coords.longitude;

            fetchWeatherData(lat, long);
        }, showError);
    } else {
        alert('Geolocation not supported. Unable to fetch data.');
    }
}

function updateDateData() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const date = new Date();
    const monthIndex = date.getMonth();

    const month = months[monthIndex];
    const monthTag = document.getElementById('month');
    monthTag.innerHTML = month;

    const day = date.getUTCDate();
    const dayTag = document.getElementById('day');
    dayTag.innerHTML = day;
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert('Request denied for Geolocation');
            break;
        case error.POSITION_UNAVAILABLE:
            alert('Location information is unavailable');
            break;
        case error.TIMEOUT:
            alert('The request to get user location timed out');
            break;
        case error.UNKNOWN_ERROR:
            alert('An unknown error occurred');
            break;
    }
}

async function fetchWeatherData(lat, long) {
    const apiKey = 'd80172e905e5cca0f6e494fb74060015';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const temperature = data['main'].temp;
    const weatherType = data['weather'][0].main;
    const humidity = data['main'].humidity;
    const wind = data['wind'].speed;
    const city = data['name'];

    document.getElementById('location').innerHTML = city;
    document.getElementById('humidity').firstChild.data = humidity;
    // document.getElementById('uv-intensity').innerHTML = wind;
    document.getElementById('weather-type').innerHTML = weatherType;
    document.getElementById('wind').firstChild.data = (wind * 3.6).toFixed(0);
    document.getElementById('temperature').firstChild.data = (temperature - 273.15).toFixed(0);
}