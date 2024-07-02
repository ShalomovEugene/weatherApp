import Image from "next/image";

const CustomTooltip = ({ active, payload, label, theme }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;

    return (
      <div
        className={` rounded-lg p-4  text-sm ${
          theme === "light"
            ? "bg-blue-500 text-white"
            : "bg-sky-900 text-gray-200"
        }`}
      >
        <div className="flex font-bold space-x-4 mb-2">
          <div>
            <p>{`Date: ${data.date}`}</p>
            <p>{`Time: ${label}`}</p>
          </div>
          <Image
            src={`https://openweathermap.org/img/wn/${data.weatherIcon}.png`}
            alt={data.weather}
            width={50}
            height={50}
          />
        </div>
        <ul className="space-y-1  text-white rounded-lg">
          <li className="border-b border-cyan-500 pb-1">
            {`Temperature: ${data.temperature}°C`}
          </li>
          <li className="border-b border-cyan-500 pb-1">
            {`Min Temperature: ${data.tempMin}°C`}
          </li>
          <li className="border-b border-cyan-500 pb-1">
            {`Max Temperature: ${data.tempMax}°C`}
          </li>
          <li className="border-b border-cyan-500 pb-1">
            {`Pressure: ${data.pressure} hPa`}
          </li>
          <li className="border-b border-cyan-500 pb-1">
            {`Wind Speed: ${data.windSpeed} m/s`}
          </li>
          <li className="border-b border-cyan-500 pb-1">
            {`Cloudiness: ${data.clouds}%`}
          </li>
          <li className="border-b border-cyan-500 pb-1">
            {`Visibility: ${data.visibility} m`}
          </li>
          <li className="border-b border-cyan-500 pb-1">
            {`Weather: ${data.weather}`}
          </li>
          <li className="border-b border-cyan-500 pb-1">
            {`Humidity: ${data.humidity}%`}
          </li>
        </ul>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
