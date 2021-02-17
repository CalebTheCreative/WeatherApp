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

    // Lists previous searched results from searched city
    function listSearchResults(city) {
        var formerCity = $("<button>");
        formerCity.text(city);
        formerCity.addClass("button cityBtn")
        searchHistoryEl.append(formerCity);
    }

    // Function to list results from API
    function showCityInfo(city) {

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=" + APIKey;
        // var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + APIKey;

        // Grab Current Weather
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            weatherStats.show();
            var grabDate = moment();

            // Lists city searched
            var displayCity = $("<h3>");
            displayCity.text(response.name + " ( " + grabDate.format("M/D/YYYY") + " ) ");

            cityName.empty();
            cityName.append(displayCity);

            console.log(response);

            // Temperature
            tempNow.html("<b>Temperatute:</b> " + response.main.temp + " ºF");

            // Humidity
            humidNow.html("<b>Humidity:</b> " + response.main.humidity + " %");

            // Wind Speed
            windNow.html("<b>Wind Speed:</b> " + response.wind.speed + " MPH");

            // Weather Icon
            var currentWeatherIcon = $("#currentWeatherIcon");
            currentWeatherIcon.empty();
            var iconSource = "http://openweathermap.org/img/wn/" + response.weather[0].icon + ".png";
            currentWeatherIcon.attr("src", iconSource);

            // Coordinates
            latitude = response.coord.lat;
            longitude = response.coord.lon;

            var queryURL2 =
                "http://api.openweathermap.org/data/2.5/uvi?" +
                "lat=" + latitude +
                "&lon=" + longitude +
                "&appid=" + APIKey;

            // UV Index
            $.ajax({
                url: queryURL2,
                method: "GET"
            }).then(function (UVIndex) {

                var uvText = $("<p>");
                uvText.html("<b>UV Index:</b> ");

                var uvBtn = $("<button>");
                var currentUVI = UVIndex.value;
                uvBtn.text(currentUVI);

                uvNow.append(uvText);

                if (currentUVI < 3) {
                    uvBtn.addClass("btn btn-succss btn-sm");
                    uvBtnDiv.append(uvBtn);
                }

                else if (3 < currentUVI < 6) {
                    uvBtn.addClass("btn btn-warning btn-sm");
                    uvBtnDiv.append(uvBtn);
                }

                else {
                    uvBtn.addClass("btn btn-danger btn-sm");
                    uvBtnDiv.append(uvBtn);
                }


            });

            var queryURL3 =
                "https://api.openweathermap.org/data/2.5/forecast?q=" +
                city + "&units=imperial" +
                "&appid=" + APIKey;

            // 5 Day Forecast
            $.ajax({
                url: queryURL3,
                method: "GET"
            }).then(function (forecastInfo) {
                console.log(forecastInfo);

                forecastTitle.show();
                // Forecast Date
                for (var i = 5; i < forecastInfo.list.length; i += 8) {
                    var futurePosition = (i + 3) / 8;


                    // -------------

                    var forecastDate = $("<h5>");

                    $("#date" + futurePosition).empty();
                    $("#date" + futurePosition).append(
                        forecastDate.text(grabDate.add(1, "days").format("M/D/YYYY"))
                    );

                    var forecastIcon = $("<img>");
                    forecastIcon.attr(
                        "src",
                        "https://openweathermap.org/img/w/" +
                        forecastInfo.list[i].weather[0].icon +
                        ".png"
                    );

                    $("#icon" + futurePosition).empty();
                    $("#icon" + futurePosition).append(forecastIcon);

                    $("#temp" + futurePosition).text(
                        "Temp: " + forecastInfo.list[i].main.temp + " °F"
                    );
                    $("#humidity" + futurePosition).text(
                        "Humidity: " + forecastInfo.list[i].main.humidity + "%"
                    );

                    $(".forecast").attr(
                        "style",
                        "background-color:dodgerblue; color:white"
                    );
                }

            });
        });
    };

}); // End of document.ready()