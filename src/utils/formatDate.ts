import day from "dayjs";

const formatDate = (data: string) => {
  const date = day(data);
  if (day().startOf("day").isSame(date, "day")) {
    return "Сегодня, " + date.format("HH:mm");
  }
  if (day().subtract(1, "day").isSame(date, "day")) {
    return "Вчера, " + date.format("HH:mm");
  }
  return date.format("DD:MM, HH:mm");
};

export default formatDate;
