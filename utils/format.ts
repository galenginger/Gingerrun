// Små hjälpfunktioner som gör om data till text som visas i appen.

const WEEKDAYS = ["sön", "mån", "tis", "ons", "tor", "fre", "lör"];
const MONTHS = [
  "jan", "feb", "mar", "apr", "maj", "jun",
  "jul", "aug", "sep", "okt", "nov", "dec",
];

// "2026-09-22" -> "tis 22 sep"
export function formatDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return `${WEEKDAYS[date.getDay()]} ${day} ${MONTHS[month - 1]}`;
}

// 10 km på 58 min -> "5:48"  (minuter:sekunder per km)
export function formatPace(distanceKm: number, durationMin: number): string {
  if (distanceKm <= 0 || durationMin <= 0) return "–";
  const secondsPerKm = Math.round((durationMin * 60) / distanceKm);
  const minutes = Math.floor(secondsPerKm / 60);
  const seconds = secondsPerKm % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

// 5.2 -> "5,2"  (svenskt decimaltecken)
export function formatKm(distanceKm: number): string {
  return distanceKm.toString().replace(".", ",");
}
