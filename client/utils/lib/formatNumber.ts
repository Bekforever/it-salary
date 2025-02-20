export const formatNumber = (number: number) => {
  return number?.toLocaleString('ru-RU')?.replace(/,/g, ' ')
}
