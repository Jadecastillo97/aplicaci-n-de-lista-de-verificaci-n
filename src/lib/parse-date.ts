export function parseDate(date: string) {
  const dateObj = new Date(date)
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric"
  }
  const formattedDate = dateObj.toLocaleDateString("es-ES", options)
  return formattedDate
}
