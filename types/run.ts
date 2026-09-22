// En löprunda. Det här är formen på datan som appen jobbar med.
export type Run = {
  id: string;
  date: string; // ISO-datum, t.ex. "2026-09-22"
  distanceKm: number;
  durationMin: number;
  location?: { latitude: number; longitude: number };
  weather?: { tempC: number; windSpeedMs: number };
};
