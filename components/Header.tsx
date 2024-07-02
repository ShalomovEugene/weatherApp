import formatTimestamp from "@/helpers/formatTimestamp";
import getUniqueDates from "@/helpers/getUniqueDates";
import { AppDispatch, RootState } from "@/store/store";
import { setTheme } from "@/store/themeSlice";
import {
  IconMoon,
  IconSunFilled,
  IconSunrise,
  IconSunset,
} from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import NavigationMenu from "./NavigationMenu";
import { Button } from "./ui/button";
import WeatherSearch from "./WeatherSearch";

const Header = ({ weather }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const uniqueDates = getUniqueDates(weather.list);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    dispatch(setTheme(newTheme));
  };

  return (
    <header
      className={`p-6 rounded-lg shadow-lg mb-2 ${
        theme === "light"
          ? "bg-blue-500 text-white"
          : "bg-gray-800 text-gray-200"
      }`}
    >
      <div className="flex justify-between items-center flex-col lg:flex-row lg:mb-6 mb-4">
        <h1 className="md:text-3xl text-2xl font-bold mb-4 lg:mb-0">
          Weather in {weather.city.name}
        </h1>
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <WeatherSearch />
          <Button onClick={toggleTheme} className="rounded-full">
            {theme === "light" ? (
              <IconMoon size={"25"} />
            ) : (
              <IconSunFilled size={"25"} />
            )}
          </Button>
        </div>
      </div>
      <div className="flex md:justify-between sm:flex-col flex-row lg:flex-row items-center flex-wrap lg:space-y-0 space-y-2 justify-center">
        <div className="flex space-x-2 order-1 lg:order-1">
          <IconSunrise />
          <h2 className="text-md md:text-xl sm:mb-2 xl:mb-0">
            Sunrise:
            <span className="font-semibold ml-2">
              {formatTimestamp(weather.city.sunrise)}
            </span>
          </h2>
        </div>

        <NavigationMenu dates={uniqueDates} theme={theme} />
        <div className="flex space-x-2 order-2 lg:order-3">
          <IconSunset />
          <h2 className="text-md md:text-xl sm:mb-2 xl:mb-0">
            Sunset:
            <span className="font-semibold ml-2">
              {formatTimestamp(weather.city.sunset)}
            </span>
          </h2>
        </div>
      </div>
    </header>
  );
};

export default Header;
