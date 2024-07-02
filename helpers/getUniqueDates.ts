const getUniqueDates = (list: List[]) => {
  const dateSet = new Set();
  list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    dateSet.add(date);
  });
  return Array.from(dateSet);
};

export default getUniqueDates;
