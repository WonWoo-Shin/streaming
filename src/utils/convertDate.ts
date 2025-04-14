export const convertDate = (date: string) => {
  if (!date) return null;

  const newDate = new Date(date);
  return `${newDate.getFullYear()}.${
    newDate.getMonth() + 1
  }.${newDate.getDate()}`;
};
