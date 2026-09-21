// En löprunda. Det här är formen på datan som appen jobbar med.
// Vi bygger ut den här typen senare (t.ex. med väder) när vi kommer till Fas 4.
export type Run = {
  id: string;
  date: string; // ISO-datum, t.ex. "2026-09-22"
  distanceKm: number;
  durationMin: number;
};
