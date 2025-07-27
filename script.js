function toggleTheme() {
  const body = document.body;
  const button = document.getElementById("theme-toggle");

  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    button.textContent = "☀️ Light Mode";
  } else {
    button.textContent = "🌙 Dark Mode";
  }
}
document.getElementById("searchBtn").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value.trim();
  if(city) {
    window.location.href = `weather.html?city=${encodeURIComponent(city)}`;
  } else {
    alert("Please enter a city name");
  }
});

/*async function searchWeather() {
    const city = document.getElementById("cityInput").value;
    const apiKey = ''; // Replace with your actual API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("City not found");

      const data = await response.json();
      document.getElementById("weatherResult").innerHTML = `
        <h2>Weather in ${data.name}</h2>
        <p><b>Temperature:</b> ${data.main.temp}°C</p>
        <p><b>Condition:</b> ${data.weather[0].main}</p>
      `;
    } catch (error) {
      document.getElementById("weatherResult").innerHTML = `<p style="color:red;">${error.message}</p>`;
    }
  }*/