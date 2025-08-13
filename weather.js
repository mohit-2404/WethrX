async function getWeather(city) {
  const apiKey = 'de7db2b5645a788364ce7713a4663a83'; // Replace with your API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    const condition = data.weather[0].main.toLowerCase(); // e.g., "Clear", "Rain", "Clouds"

    // Change background based on condition
    changeBackground(condition);

    // Display weather
    document.getElementById("weatherResult").innerHTML = `
      <div class="box"><div class="main"><i>📍</i><b>${data.name}, ${data.sys.country}</b><br>
      <p id="temp">${data.main.temp} °C</p>
      <p><i>🤔</i>Feels Like: ${data.main.feels_like}°C</p>
      <p><i>🌤️</i>Condition: ${data.weather[0].main}</p></div>
      <div class"main-2"><div class="card"><i>💧</i>Humidity: ${data.main.humidity}%</div>
      <div class="card"><i>📈</i>Pressure: ${data.main.pressure} hPa</div>
      <div class="card"><i>🌬️</i>Wind: ${data.wind.speed} m/s, ${data.wind.deg}°</div>
      <div class="card"><i>☁️</i>Cloudiness: ${data.clouds.all}%</div></div></div>
    `;
  } catch (error) {
    document.getElementById("weatherResult").innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
}

function changeBackground(condition) {
  // Determine GIF based on weather condition
  let backgroundGif = '';

  if (condition.includes("clear")) {
    backgroundGif = 'sunny.gif';
  } else if (condition.includes("cloud")) {
    backgroundGif = 'cloudy.gif';
  } else if (condition.includes("rain")) {
    backgroundGif = 'rainy.gif';
  } else if (condition.includes("snow")) {
    backgroundGif = 'snowy.gif';
  } else if (condition.includes("thunderstorm")) {
    backgroundGif = 'thunderstorm.gif';
  } else {
    backgroundGif ="background.jpg"; // fallback
  }

  // Add overlay if not already present
  if (!document.getElementById('bg-overlay')) {
    const overlay = document.createElement('div');
    overlay.id = 'bg-overlay';
    document.body.appendChild(overlay);
  }

  // Set overlay styles (faded full-screen background)
  const overlay = document.getElementById('bg-overlay');
  overlay.style.position = 'fixed';
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundImage = `url('${backgroundGif}')`;
  overlay.style.backgroundSize = 'cover';
  overlay.style.backgroundPosition = 'center';
  overlay.style.backgroundRepeat = 'no-repeat';
  overlay.style.zIndex = '-1';
  overlay.style.opacity = '0.8'; // Fade level here (0.1 to 1)
}


// Get city from URL
const params = new URLSearchParams(window.location.search);
const city = params.get("city");

if (city) {
  getWeather(city);
} else {
  document.getElementById("weatherResult").textContent = "No city specified.";
}
