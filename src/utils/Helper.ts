export const formatedDate = (date: string) => {
  const inputDate = new Date(date);

  return inputDate.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};
