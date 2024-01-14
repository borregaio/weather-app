const apiKeyOpenCage = '067aae2211484d238b0cff439ab93db1';

var newButton = $('<button>');
var cityHistory = $('#history');
var searchButton = $('#search-button');
var searchInput = $('#search-input');
var clearButton = $('#clear-button');
var cityNames = JSON.parse(localStorage.getItem('cityNames')) || [];

clearButton.on('click', function (event) {
    event.preventDefault();

    // Clear the content of the cityHistory element
    cityHistory.empty();

    // Remove the stored city names from local storage
    localStorage.removeItem('cityNames');

    // Clear the cityNames array
    cityNames = [];
});

searchButton.on('click', function (event) {
    event.preventDefault();

    // Get the value of the input field
    var searchValue = searchInput.val().trim();

    if (searchValue !== '') {
        // Create a new button with the input's city name
        var newButton = $('<button>').addClass('btn btn-secondary').text(searchValue.charAt(0).toUpperCase() + searchValue.slice(1));

        // Append the new button to the cityHistory element
        cityHistory.append(newButton);

        // Add the city name to the array
        cityNames.push(searchValue);

        // Store the array of city names in local storage
        localStorage.setItem('cityNames', JSON.stringify(cityNames));

        // Clear the input field
        searchInput.val('');

        // Step 1: Get Latitude and Longitude from OpenCage Geocoding API
        const geocodingUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(searchValue)}&key=${apiKeyOpenCage}`;

        fetch(geocodingUrl)
            .then(response => response.json())
            .then(data => {
                if (data.results && data.results.length > 0) {
                    const location = data.results[0].geometry;
                    const latitude = location.lat;
                    const longitude = location.lng;

                    // Step 2: Use Latitude and Longitude to construct OpenWeatherMap API URL
                    const apiKeyOpenWeather = '91e283268747deb9c5dedf7f54029a13';
                    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKeyOpenWeather}`;

                    // Step 3: Fetch weather data from OpenWeatherMap API
                    return fetch(weatherApiUrl);
                } else {
                    console.error('Error getting coordinates for the city');
                }
            })
            .then(weatherResponse => weatherResponse.json())
            .then(weatherData => {
                // Step 4: Access the weather icon code and create the URL for the PNG image
                const iconCode = weatherData.list[0].weather[0].icon;
                const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
                const temperatureKelvin = weatherData.list[0].main.temp;
                const temperatureCelsius = (temperatureKelvin - 273.15).toFixed(2);
                const windCode = weatherData.list[0].wind.speed;
                const humidityCode = weatherData.list[0].main.humidity;
                // console.log('Weather Icon URL:', iconUrl);

                // Today's weather
                var today = dayjs();
                var todayInfo = $('#today');
                // Clear existing content before appending new information
                todayInfo.empty();
                var emoji = $('<img>');
                var temperature = $('<p>');
                var wind = $('<p>');
                var humidity = $('<p>');

                todayInfo.append(searchValue.charAt(0).toUpperCase() + searchValue.slice(1));
                todayInfo.append(' ');
                todayInfo.append(today.format('DD/MM/YYYY'));
                todayInfo.append(' ');
                todayInfo.append(emoji.attr('src', iconUrl));
                todayInfo.append(temperature.text('Temp: ' + temperatureCelsius + '°C'));
                todayInfo.append(wind.text('Wind: ' + windCode + 'KPH'));
                todayInfo.append(humidity.text('Humidity: ' + humidityCode + '%'));

                var forecast = $('#forecast');

                // Clear existing content before appending new information
                forecast.empty();

                var day1 = $('<div>');
                var day1h1 = $('<h4>');
                var day1Date = today.add(1, 'day');
                var day1emoji = $('img');
                const day1Icon = weatherData.list[4].weather[0].icon;
                const day1IconUrl = `http://openweathermap.org/img/wn/${day1Icon}.png`;
                var day1Temperature = $('<p>');
                var day1Wind = $('<p>');
                var day1Humidity = $('<p>');

                const day1TemperatureKelvin = weatherData.list[8].main.temp;
                const day1TemperatureCelsius = (temperatureKelvin - 273.15).toFixed(2);
                const day1WindCode = weatherData.list[8].wind.speed;
                const day1HumidityCode = weatherData.list[8].main.humidity;

                forecast.append($('<h3>').text('5-Day Forecast:'));
                // Set the content for day 1
                day1h1.text(day1Date.format('DD/MM/YYYY'));
                day1.append(day1h1);
                day1.append(day1emoji.attr('src', day1IconUrl));
                day1.append(day1Temperature.text('Temp: ' + day1TemperatureCelsius + '°C'));
                day1.append(day1Wind.text('Wind: ' + day1WindCode + 'KPH'));
                day1.append(day1Humidity.text('Humidity: ' + day1HumidityCode + '%'));



                // Append day 1 to the forecast
                forecast.append(day1);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
});




























