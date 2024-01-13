const apiKey = '91e283268747deb9c5dedf7f54029a13';
const queryURL = 'api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid='

const url = queryURL + apiKey

//Create button when city is entered on search input

var newButton = $('<button>');
var cityHistory = $('#history');
var searchButton = $('#search-button');
var searchInput = $('#search-input');
var clearButton = $('#clear-button');

// Get the existing city names from local storage or initialize an empty array
var cityNames = JSON.parse(localStorage.getItem('cityNames')) || [];


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

        //Clear the input field
        searchInput.val('');
    }

});

clearButton.on('click', function(event) {
    event.preventDefault();

    // Clear the content of the cityHistory element
    cityHistory.empty();

    // Remove the stored city names from local storage
    localStorage.removeItem('cityNames');

    // Clear the cityNames array
    cityNames = [];
});



