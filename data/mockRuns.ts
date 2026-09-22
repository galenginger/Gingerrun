import { Run } from "../types/run";

// Testdata så listan inte är tom medan vi bygger. Ligger i en egen fil
// (istället för i index.tsx) så att både startsidan och detaljsidan
// (run/[id].tsx) kan använda samma rundor. Byts ut mot riktig sparning
// när new-run.tsx är klar och vi har lärt oss dela state mellan skärmar.
export const mockRuns: Run[] = [
  { id: "1", date: "2026-09-18", distanceKm: 5.2, durationMin: 28 },
  { id: "2", date: "2026-09-20", distanceKm: 10.1, durationMin: 58 },
];

// Lägger till en ny runda överst i listan. Muterar mockRuns direkt (i
// stället för att skapa en ny array) eftersom det är samma array-referens
// som index.tsx läser från - enklaste sättet att "spara" utan en riktig
// databas eller delat state mellan skärmar.
export function addRun(run: Run) {
  mockRuns.unshift(run);
}
