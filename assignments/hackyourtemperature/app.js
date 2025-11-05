import express from "express";
import fetch from "node-fetch";
import { keys } from "./sources/keys.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).send(`hello from backend to frontend!`);
});

app.post("/weather", async (req, res) => {
  const { cityName } = req.body;
  if (!cityName || cityName.trim() === "") {
    return res.status(400).json({ msg: "City name is required." });
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    cityName.trim()
  )}&appid=${keys.API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(400).json({ weatherText: "City is not found!" });
    }
    const data = await response.json();

    return res.json({ main: data.main });
  } catch (error) {
    res.send(error);
  }
});

export default app;
