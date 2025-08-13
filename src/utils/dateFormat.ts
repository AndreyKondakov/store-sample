export function formatCustomDate(date: Date): string {
  const padTo2Digits = (num: number) => num.toString().padStart(2, "0");

  const hours = padTo2Digits(date.getHours());
  const minutes = padTo2Digits(date.getMinutes());
  const day = padTo2Digits(date.getDate());
  const month = padTo2Digits(date.getMonth() + 1);
  const year = date.getFullYear();

  return `${hours}:${minutes} ${day}.${month}.${year}`;
}
