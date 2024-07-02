"use client";
import CurrentDayData from "@/components/CurrentDayData";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Loader from "@/components/Loader";

const Day = ({
  params: { day },
}: {
  params: {
    day: string;
  };
}) => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const { weather, loading } = useSelector((state: RootState) => state.user);

  if (loading || !weather) {
    return <Loader />;
  }

  const currentDayData = weather.list.filter((item: List) => {
    const itemDate = item.dt_txt.split(" ")[0];
    return itemDate === day;
  });

  return (
    <div className="mb-2">
      <CurrentDayData
        currentDayData={currentDayData}
        currentDate={day}
        theme={theme}
      />
    </div>
  );
};

export default Day;
