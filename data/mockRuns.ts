import { Run } from "../types/run";

// Testdata så listan inte är tom medan vi bygger. Ligger i en egen fil
// (istället för i index.tsx) så att både startsidan och detaljsidan
// (run/[id].tsx) kan använda samma rundor. Byts ut mot riktig sparning
// när new-run.tsx är klar och vi har lärt oss dela state mellan skärmar.
export const mockRuns: Run[] = [
  { id: "1", date: "2026-09-18", distanceKm: 5.2, durationMin: 28 },
  { id: "2", date: "2026-09-20", distanceKm: 10.1, durationMin: 58 },
];
