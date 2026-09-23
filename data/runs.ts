import { File, Paths } from "expo-file-system";
import { Run } from "../types/run";

// Alla löprundor som appen känner till. Startar med två testrundor så
// listan inte är tom vid allra första appstart, innan någon egen runda
// finns sparad på disk.
export const savedRuns: Run[] = [
  { id: "1", date: "2026-09-18", distanceKm: 5.2, durationMin: 28 },
  { id: "2", date: "2026-09-20", distanceKm: 10.1, durationMin: 58 },
];

const runsFile = new File(Paths.document, "runs.json");

// Läser sparade rundor från disk (om filen finns) och fyller savedRuns
// med dem, så samma array-referens fortfarande delas mellan skärmarna.
// Expo SDK-boilerplate, inget att skriva själv här.
export function loadRuns(): Run[] {
  if (runsFile.exists) {
    const saved: Run[] = JSON.parse(runsFile.textSync());
    savedRuns.length = 0;
    savedRuns.push(...saved);
  }
  return savedRuns;
}

function saveRuns() {
  if (!runsFile.exists) {
    runsFile.create();
  }
  runsFile.write(JSON.stringify(savedRuns));
}

// Lägger till en ny runda överst i listan och sparar hela listan till
// disk, så den finns kvar nästa gång appen startas.
export function addRun(run: Run) {
  savedRuns.unshift(run);
  saveRuns();
}

// Tar bort rundan med ett visst id och sparar den uppdaterade listan
// till disk.
export function deleteRun(id: string) {
  const index = savedRuns.findIndex((r) => r.id === id);
  if (index !== -1) {
    savedRuns.splice(index, 1);
  }

  saveRuns();
}
