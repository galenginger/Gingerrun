import { Run } from "../types/run";

export type WeekTotal = {
  label: string; // t.ex. "v.38"
  km: number;
};

// Veckonummer enligt ISO 8601 (det som används i Sverige, vecka 1 är
// veckan med årets första torsdag).
function isoWeek(date: Date): number {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const dayNr = (d.getDay() + 6) % 7; // måndag = 0
  d.setDate(d.getDate() - dayNr + 3); // torsdag samma vecka
  const firstThursday = new Date(d.getFullYear(), 0, 4);
  const diffDays = (d.getTime() - firstThursday.getTime()) / 86400000;
  return 1 + Math.round((diffDays - 3 + ((firstThursday.getDay() + 6) % 7)) / 7);
}

// Måndagen i samma vecka som date, klockan 00:00.
function startOfWeek(date: Date): Date {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return d;
}

// Summerar km per vecka för de senaste `weeks` veckorna, äldst först.
// Veckor utan rundor blir 0 km så att staplarna alltid är lika många.
export function getWeeklyKm(runs: Run[], weeks: number): WeekTotal[] {
  const thisMonday = startOfWeek(new Date());
  const result: WeekTotal[] = [];

  for (let i = weeks - 1; i >= 0; i--) {
    const monday = new Date(thisMonday);
    monday.setDate(thisMonday.getDate() - i * 7);
    const nextMonday = new Date(monday);
    nextMonday.setDate(monday.getDate() + 7);

    const km = runs
      .filter((run) => {
        const [y, m, d] = run.date.split("-").map(Number);
        const runDate = new Date(y, m - 1, d);
        return runDate >= monday && runDate < nextMonday;
      })
      .reduce((sum, run) => sum + run.distanceKm, 0);

    result.push({ label: `v.${isoWeek(monday)}`, km: Math.round(km * 10) / 10 });
  }

  return result;
}
