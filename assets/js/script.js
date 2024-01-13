const apiKey = '91e283268747deb9c5dedf7f54029a13';
const queryURL = 'api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid='

const url = queryURL + apiKey

//Create button when city is entered on search input

var newButton = $('<button>');
var cityHistory = $('#history');
var searchButton = $('#search-button');

searchButton.on('click', function (event) {
    event.preventDefault();

    // Create a new button
    var newButton = $('<button>').text('Button');

    // Append the new button to the cityHistory element
    cityHistory.append(newButton);
})



