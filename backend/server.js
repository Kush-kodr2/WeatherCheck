require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(cors());

// Serve static files from frontend folder
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/api/hello", (req, res) => {
    res.json({ message: "Hello from backend, KUSH" });
});


app.get("/api/weather", async (req, res) => {
    try {
        const city = req.query.city;

        if (!city) {
            return res.status(400).json({ error: "City is required" });
        }
        const apikey = process.env.Open_Weather_Map_APIKey;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`

        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            return res.status(400).json({ error: data.message });
        }
        res.json({
            city: data.name,
            temperature: data.main.temp,
            description: data.weather[0].description,
        });

    } catch (error) {
        res.status(500).json({ error: "Server error " });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
});


