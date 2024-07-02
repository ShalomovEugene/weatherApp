"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLocation,
  setWeather,
  setLoading,
  setError,
} from "@/store/userSlice";
import { fetchWeatherData } from "@/helpers/fetchWeatherData";
import { AppDispatch, RootState } from "@/store/store";
import { initializeTheme } from "@/store/themeSlice";
import Header from "@/components/Header";
import Chart from "@/components/Chart";
import WeatherSearch from "@/components/WeatherSearch";
import Loader from "@/components/Loader";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector((state: RootState) => state.theme.theme);

  useEffect(() => {
    const fetchLocationAndWeather = async (
      latitude: number,
      longitude: number
    ) => {
      try {
        dispatch(setLoading());
        const weatherData = await fetchWeatherData(latitude, longitude);
        dispatch(setWeather(weatherData));
      } catch (error) {
        dispatch(setError("Error loading weather data"));
        console.error("Error loading weather data:", error);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          dispatch(setLocation({ latitude, longitude }));
          fetchLocationAndWeather(latitude, longitude);
        },
        (error) => {
          dispatch(setError("Error getting location"));
          console.error("Error getting location:", error);
        }
      );
    } else {
      dispatch(setError("Geolocation is not supported by this browser."));
      console.error("Geolocation is not supported by this browser.");
    }

    dispatch(initializeTheme());
  }, [dispatch]);

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);
  const { weather, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  if (loading || !weather) {
    if (error) {
      return <WeatherSearch error={error} />;
    }
    return <Loader />;
  }

  return (
    <main
      className={`root min-h-screen ${
        theme === "light"
          ? "bg-sky-500 text-white"
          : "bg-indigo-950 text-gray-200"
      }`}
    >
      <div className="root-container container mx-auto pt-4">
        <div className="wrapper">
          <Header weather={weather} />
          {children}
          <Chart data={weather.list} />
        </div>
      </div>
    </main>
  );
};

export default Layout;
