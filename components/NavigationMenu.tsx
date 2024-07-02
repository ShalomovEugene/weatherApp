import formatDate from "@/helpers/formatDate";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavigationMenu = ({ dates, theme }: any) => {
  const currentDate = new Date().toISOString().split("T")[0];
  const pathname = usePathname();

  return (
    <ul
      className={`md:order-3 order-last space-x-4 p-4 flex justify-center rounded-lg font-bold border ${
        theme === "light"
          ? "bg-blue-500 text-white"
          : "bg-gray-800 text-gray-200"
      }`}
    >
      {dates.map((date: string) => {
        const isActive =
          pathname === `/day/${date}` ||
          (date === currentDate && pathname === "/");
        return (
          <li key={date}>
            <Link
              className={` pb-2 mb-2 underline-offset-8 hover:text-green-300 hover:underline ${
                isActive && "text-green-300"
              }`}
              href={
                date === currentDate
                  ? "/"
                  : `/day/${date.replace(/\s/g, "-").toLowerCase()}`
              }
            >
              {formatDate(date)}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavigationMenu;
