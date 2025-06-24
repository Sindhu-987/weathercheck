const apiKey = '843d51c13a55525ff49ccf0302184faa'; // replace with your real API key

function getWeather() {
  const city = encodeURIComponent(document.getElementById('cityInput').value);
  const resultDiv = document.getElementById('weatherResult');

  if (!city) {
    resultDiv.innerHTML = '<p>Please enter a city name.</p>';
    resultDiv.classList.remove('hidden');
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => {
      if (!response.ok) throw new Error('City not found');
      return response.json();
    })
    .then(data => {
      const { temp, humidity } = data.main;
      const weather = data.weather[0].description;
      const iconCode = data.weather[0].icon;
      const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

      resultDiv.innerHTML = `
        <div class="weather-icon">
          <img src="${iconUrl}" alt="${weather}">
        </div>
        <p><strong>City:</strong> ${data.name}</p>
        <p><strong>Temperature:</strong> ${temp} °C 🌡</p>
        <p><strong>Humidity:</strong> ${humidity}% 💧</p>
        <p><strong>Forecast:</strong> ${weather}</p>
      `;
      resultDiv.classList.remove('hidden');
    })
    .catch(error => {
      resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
      resultDiv.classList.remove('hidden');
    });
}
