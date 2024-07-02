"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import CurrentDayData from "./CurrentDayData";
import Loader from "./Loader";

const Weather = () => {
  const { weather, loading } = useSelector((state: RootState) => state.user);
  const theme = useSelector((state: RootState) => state.theme.theme);
  if (loading || !weather) {
    return <Loader />;
  }

  const currentTime = new Date();
  const currentDate = currentTime.toISOString().split("T")[0];

  const currentDayData = weather.list.filter((item: List) => {
    const itemDate = item.dt_txt.split(" ")[0];
    return itemDate === currentDate;
  });

  return (
    <div className="space-y-2 mb-2">
      <CurrentDayData
        currentDayData={currentDayData}
        currentDate={currentDate}
        theme={theme}
      />
    </div>
  );
};

export default Weather;
