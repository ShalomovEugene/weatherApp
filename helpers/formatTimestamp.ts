import { format } from "date-fns";

const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  return format(date, "dd MMM yyyy HH:mm:ss");
};

export default formatTimestamp;
