import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import CustomTooltip from "./CustomTooltip";

const Chart = ({ data }: { data: List[] }) => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const chartData = data.map((item: List) => ({
    time: new Date(item.dt * 1000).toLocaleTimeString("ua-UA", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    date: new Date(item.dt * 1000)
      .toLocaleDateString("ua-UA")
      .replace(/\//g, "."),
    temperature: item.main.temp,
    tempMin: item.main.temp_min,
    tempMax: item.main.temp_max,
    pressure: item.main.pressure,
    windSpeed: item.wind.speed,
    clouds: item.clouds.all,
    visibility: item.visibility,
    weather: item.weather[0].description,
    weatherIcon: item.weather[0].icon,
    humidity: item.main.humidity,
  }));

  return (
    <div
      className={`p-4 bg-blue-500 shadow rounded-lg ${
        theme === "light"
          ? "bg-blue-500 text-white"
          : "bg-gray-800 text-gray-200"
      }`}
    >
      <h2 className="text-xl font-semibold mb-4">Forecast by Hour</h2>
      <div className="bg-white rounded-lg">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis
              label={{
                value: "Temperature (°C)",
                angle: -90,
                position: "insideLeft",
                dx: 10,
                style: {
                  textAnchor: "middle",
                  fill: "#333",
                  fontSize: "0.875rem",
                },
              }}
            />
            <Tooltip content={<CustomTooltip theme={theme} />} />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#ffb741"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
