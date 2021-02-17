$(document).ready(function () {
    // Variables
    var city = $("#cityForm");
    var citySubmitEl = $("#citySubmit");
    var searchHistoryEl = $("#searchHistory");
    var cityName = $("#cityName");
    var tempNow = $("#tempNow");
    var humidNow = $("#humidNow");
    var windNow = $("#windNow");
    var uvNow = $("#uvNow");
    var uvBtnDiv = $("#uvBtnDiv");

    var latitude;
    var longitude;

    var APIKey = "e8902d84d7e295b9d390de2f5582b4b5";

    var searchResults = JSON.parse(localStorage.getItem("searchResults") || "[]");

    var forecastTitle = $("#forecastTitle");
    forecastTitle.hide();

    var weatherStats = $("#weatherStats");
    weatherStats.hide();

    // Takes in form submission
    citySubmitEl.on("click", function (event) {
        event.preventDefault();
        var city = $("#cityForm")
            .val()
            .trim()
            .toLowerCase();

        showCityInfo(city);
        listSearchResults(city);
    });

    // Takes in search history button for result
    $(".cityButton").on("click", function () {
        var cityChoice = this.text
            .val()
            .trim()
            .toLowerCase();

        showCityInfo(cityChoice);
        listSearchResults(cityChoice);
    })

    // Lists results from searched city
    function listSearchResults(city) {
        var formerCity = $("<button>");
        formerCity.text(city);
        formerCity.addClass("button cityBtn")
        searchHistoryEl.append(formerCity);
    }

}); // End of document.ready()