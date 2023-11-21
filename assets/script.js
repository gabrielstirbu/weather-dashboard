// Event form submission
$("#search-form").submit(function (event) {
    event.preventDefault(); // Prevents the form from submitting 

    // Get the info from the form
    var city = $("#search-input").val().trim();

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
            // Update the current weather on the page
            updateCurrentWeather(data);
        });
}

function updateCurrentWeather(data) {

    // div to hold the current weather 
    var currentWeatherDiv = $("<div>").addClass("current-weather");

    // Display city name
     // Display date
    var currentDate = dayjs().format("(MMMM D, YYYY)");
    currentWeatherDiv.append("<h2>" + data.name + " " + currentDate + "</h2>");


    // Display temperature, humidity, and wind speed
    currentWeatherDiv.append("<p>Temperature: " + data.main.temp + " &#8457;</p>");
    currentWeatherDiv.append("<p>Humidity: " + data.main.humidity + "%</p>");
    currentWeatherDiv.append("<p>Wind Speed: " + data.wind.speed + " m/s</p>");

    // Append the current weather
    $("#current-weather").html(currentWeatherDiv);
}
