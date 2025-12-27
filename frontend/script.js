
async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const output = document.getElementById("output");
  const spinner = document.getElementById("spinner");
  if (!city) {
    output.innerText = "Please enter a city";
    return;
  }
  spinner.style.display = "block";
  output.innerText = "";

  try {
    const res = await fetch(`/api/weather?city=${city}`);

    const data = await res.json();
    if (data.error) {
      output.innerText = data.error;
      return;
    }

    output.innerText = `🌍 ${data.city}
🌡️ ${data.temperature}°C
☁️ ${data.description}`;
  } catch (error) {
    output.innerText = "Failed to fetch weather";
  }finally {
    
    spinner.style.display = "none";
  }
}