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

}); // End of document.ready()