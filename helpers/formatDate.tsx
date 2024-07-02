const formatDate = (dateString: string) => {
  const options: any = { month: "short", day: "2-digit" };
  return new Date(dateString)
    .toLocaleDateString("en-US", options)
    .toUpperCase();
};

export default formatDate;
