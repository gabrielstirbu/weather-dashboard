// Event form submission
$("#search-form").submit(function (event) {
    event.preventDefault(); // Prevents the form from submitting 

    // Get the info from the form
    var city = $("#search-input").val().trim();

    // Call a function to store the city in localStorage
    addToHistory(city);

    // Call a function to fetch weather data
    getWeatherData(city);
});

function getWeatherData(city) {
    var apiKey = "497df0c049f047dab27ca55353286085";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // Call a function to update the current weather on the page
            updateCurrentWeather(data);
        });
}

function updateCurrentWeather(data) {
    // div to hold the current weather 
    var currentWeatherDiv = $("<div>").addClass("current-weather");

    // Display city name and date
    var currentDate = dayjs().format("(MMMM D, YYYY)");
    currentWeatherDiv.append("<h2>" + data.name + " " + currentDate + "</h2>");

    // Display temperature, humidity, and wind speed
    currentWeatherDiv.append("<p>Temperature: " + data.main.temp + " &#8457;</p>");
    currentWeatherDiv.append("<p>Humidity: " + data.main.humidity + "%</p>");
    currentWeatherDiv.append("<p>Wind Speed: " + data.wind.speed + " m/s</p>");

    // Append the current weather
    $("#current-weather").html(currentWeatherDiv);
}

function addToHistory(city) {
    // Retrieve existing cities from localStorage
    var cities = JSON.parse(localStorage.getItem("cities")) || [];

    // Add the new city to the array if it's not already there
    if (!cities.includes(city)) {
        cities.push(city);

        // Save the arrayto localStorage
        localStorage.setItem("cities", JSON.stringify(cities));

        // Update the history on the page
        updateHistory(cities);
    }
}

function updateHistory(cities) {
    // Create a list to hold the city history
    var historyList = $("<div>").addClass("list-group");

    // Iterate over the cities and create list items
    cities.forEach(function (city) {
        var listItem = $("<a>")
            .addClass("list-group-item list-group-item-action")
            .text(city);

        // Click events
        listItem.click(function () {
            getWeatherData(city);
        });

        // Append the list 
        historyList.prepend(listItem);
    });

    // Append the history list to the div
    $("#history").html(historyList);
}

// Call to update the localStorage
updateHistory(JSON.parse(localStorage.getItem("cities")) || []);