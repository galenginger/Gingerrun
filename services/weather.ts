import { Coords, Weather } from "../types/run";

// Hämtar aktuellt väder för en position från Open-Meteo (gratis, ingen
// API-nyckel behövs). Web API-anrop + JSON-hantering, ren boilerplate.
export async function getCurrentWeather(coords: Coords): Promise<Weather | null> {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current_weather=true&windspeed_unit=ms`;
    const response = await fetch(url);
    const data = await response.json();
    return {
      tempC: data.current_weather.temperature,
      windSpeedMs: data.current_weather.windspeed,
    };
  } catch {
    return null;
  }
}
