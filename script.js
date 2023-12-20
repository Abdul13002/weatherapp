document.addEventListener("DOMContentLoaded", function () {
  const API_KEY = "db4ad25129381f5132d4c456db842cf9";

  function changeBackground(city) {
    const randomValue = new Date().getTime(); // Current timestamp to avoid cache
    const refinedQuery = `${city} cityscape`; // Refining the search query
    const url = `https://source.unsplash.com/1600x900/?${refinedQuery}&${randomValue}`;
    document.body.style.backgroundImage = `url(${url})`;
  }
  document
    .getElementById("search-button")
    .addEventListener("click", function () {
      let city = document.querySelector(".search-bar").value;

      if (!city.trim()) {
        alert("Please enter a city name!");
        return;
      }

      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.cod === 200) {
            document.querySelector(".city").textContent = data.name;
            document.querySelector(".temp").textContent = `${Math.round(
              data.main.temp
            )}°F`;
            document.querySelector(".description").textContent =
              data.weather[0].description;
            document.querySelector(
              ".humidity"
            ).textContent = `Humidity: ${data.main.humidity}%`;
            document.querySelector(
              ".wind"
            ).textContent = `Wind speed: ${data.wind.speed} km/h`;
            document.querySelector(
              ".icon"
            ).src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
            document.querySelector(".weather").classList.remove("hidden");

            changeBackground(city); // Set the background image for the city
          } else {
            document.querySelector(".weather").classList.add("hidden");
            alert(`Error: ${data.message}`);
          }
        })
        .catch((error) => {
          document.querySelector(".weather").classList.add("hidden");
          console.error("There was an error fetching the data.", error);
          alert("An error occurred. Please try again.");
        });
    });
});
