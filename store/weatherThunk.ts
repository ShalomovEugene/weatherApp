import { createAsyncThunk } from "@reduxjs/toolkit";
import { setLoading, setWeather, setError } from "./userSlice";

export const fetchWeatherByCity = createAsyncThunk(
  "user/fetchWeatherByCity",
  async (city: string, { dispatch }) => {
    dispatch(setLoading());
    try {
      const apiKey = process.env.API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("City not found or invalid");
      }
      const data = await response.json();
      dispatch(setWeather(data));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setError(error.message));
      } else {
        dispatch(setError("An unknown error occurred"));
      }
    }
  }
);

export const fetchWeatherByGeolocation = createAsyncThunk<
  WeatherResponse,
  { latitude: number; longitude: number }
>("weather/fetchWeatherByGeolocation", async ({ latitude, longitude }) => {
  const apiKey = process.env.API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data: WeatherResponse = await response.json();
  return data;
});
