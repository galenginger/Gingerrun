export type Coords = { latitude: number; longitude: number };
export type Weather = { tempC: number; windSpeedMs: number };

// En löprunda. Det här är formen på datan som appen jobbar med.
export type Run = {
  id: string;
  date: string; // ISO-datum, t.ex. "2026-09-22"
  distanceKm: number;
  durationMin: number;
  location?: Coords;
  weather?: Weather;
};
