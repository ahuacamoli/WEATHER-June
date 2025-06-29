// 🕒 Feature: Show current day and time
function updateDateTime() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hour = now.getHours().toString().padStart(2, "0");
  let minutes = now.getMinutes().toString().padStart(2, "0");

  let dateTimeElement = document.querySelector("#date-time");
  if (dateTimeElement) {
    dateTimeElement.innerHTML = `${day} ${hour}:${minutes}`;
  }
}

updateDateTime();

// 📍 Capitalize helper
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// 🌤️ Feature: Handle city search + fetch weather from SheCodes API
function handleSearch(event) {
  event.preventDefault();

  let input = document.querySelector("#city-input");
  let city = input.value.trim();

  if (!city) return;

  // Update city name immediately
  document.querySelector("#city-name").innerHTML = capitalize(city);

  let apiKey = "31f97b05t5b615e5o3f86c8f94ab7748";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      // 🌡️ Update temperature
      let temperature = Math.round(data.temperature.current);
      document.querySelector(".temperature").innerHTML = temperature;

      // 💧 Optionally update humidity or other data:
      // document.querySelector(".humidity").innerHTML = `${data.temperature.humidity}%`;

      // 🌤️ Optionally update icon with:
      // document.querySelector(".icon").innerHTML = `<img src="${data.condition.icon_url}" alt="${data.condition.description}" width="40" />`;
    })
    .catch(() => {
      alert(
        `Sorry, we couldn't find the weather for "${city}". Try https://www.google.com/search?q=weather+${city}`
      );
    });
}

// 🎯 Attach form listener
let form = document.querySelector("#search-form");
if (form) {
  form.addEventListener("submit", handleSearch);
}
