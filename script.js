// Current Weather API Key
var APIKey = "e8902d84d7e295b9d390de2f5582b4b5";

var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + "Austin" + "&units=imperial" + "&appid=" + APIKey;

// AJAX call to OpenWeatherMap API
$.ajax({
    url: queryURL,
    method: "GET"
})
    .then(function(response){
        console.log(queryURL);
        console.log(response);        
    });
