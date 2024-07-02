import Image from "next/image";
import formatDate from "@/helpers/formatDate";

const CurrentDayData = ({
  currentDayData,
  currentDate,
  theme,
}: {
  currentDayData: List[];
  currentDate: string;
  theme: string;
}) => {
  return (
    <div
      className={`p-4 shadow rounded-lg mt-4 ${
        theme === "light"
          ? "bg-blue-500 text-white"
          : "bg-gray-800 text-gray-200"
      }`}
    >
      <h2 className="text-xl font-semibold mb-2">
        Weather forecast for {formatDate(currentDate)}
      </h2>

      {currentDayData.length > 0 ? (
        currentDayData.map((item: List, index: number) => (
          <div
            key={index}
            className={`mb-4 p-4 gap-4 rounded-lg shadow-md grid md:grid-cols-4 sm:grid-cols-3  ${
              theme === "light"
                ? "bg-cyan-500 text-white"
                : "bg-sky-900 text-gray-200"
            }`}
          >
            <div className="flex items-center col-span-1">
              <Image
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                alt={item.weather[0].description}
                width={70}
                height={70}
              />
              <div className="ml-4">
                <p className="text-lg font-semibold">
                  {item.dt_txt.split(" ")[1]}
                </p>
                <p className="capitalize">{item.weather[0].description}</p>
              </div>
            </div>

            <div className="grid  md:col-span-3 sm:col-span-2  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 space-y-1 gap-1  items-center">
              <p className="text-sm md:text-md text-center md:text-right">
                <span className="font-medium">Temperature:</span>{" "}
                {item.main.temp}
                °C
              </p>

              <p className="text-sm md:text-md text-center md:text-right">
                <span className="font-medium">Min Temp:</span>{" "}
                {item.main.temp_min}°C
              </p>
              <p className="text-sm md:text-md text-center md:text-right">
                <span className="font-medium">Max Temp:</span>{" "}
                {item.main.temp_max}°C
              </p>

              <p className="text-sm md:text-md text-center md:text-right">
                <span className="font-medium">Feels Like:</span>{" "}
                {item.main.feels_like}°C
              </p>

              <p className="text-sm md:text-md text-center md:text-right">
                <span className="font-medium">Humidity:</span>{" "}
                {item.main.humidity}%
              </p>
              <p className="text-sm md:text-md text-center md:text-right">
                <span className="font-medium">Pressure:</span>{" "}
                {item.main.pressure} hPa
              </p>

              <p className="text-sm md:text-md text-center md:text-right">
                <span className="font-medium">Wind Speed:</span>{" "}
                {item.wind.speed} m/s
              </p>
              <p className="text-sm md:text-md text-center md:text-right">
                <span className="font-medium">Cloud Cover:</span>{" "}
                {item.clouds.all}%
              </p>

              {item.rain && (
                <p className="text-sm md:text-md text-center md:text-right">
                  <span className="font-medium">Rain Volume:</span>{" "}
                  {item.rain["3h"]} mm
                </p>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm md:text-md text-center md:text-right">
          No data available for today.
        </p>
      )}
    </div>
  );
};

export default CurrentDayData;
