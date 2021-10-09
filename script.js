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
    const url = `api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`;

    const response = await fetch(url.toString());
    const data = await response.json();

    console.log(data);
}