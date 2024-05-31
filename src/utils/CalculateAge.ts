const parseDateString = (dateString: string) => {
  const [year, month, day] = dateString
    .split(/년|월|일/)
    .map((part) => part.trim())
    .filter((part) => part !== '');
  return new Date(Number(year), Number(month) - 1, Number(day));
};

export const calculateAge = (birthDate: string | null) => {
  if (!birthDate) return '';
  const birth = parseDateString(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDifference = today.getMonth() - birth.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return `${age}세`;
};
