import { ScrollView, StyleSheet, Text, View } from "react-native";
import { savedRuns } from "../data/runs";
import WeekBar from "../components/WeekBar";
import { colors, fonts, radius, spacing } from "../constants/theme";
import { formatKm, formatPace } from "../utils/format";
import { getWeeklyKm } from "../utils/stats";

// Statistiksidan räknar ut sammanfattningar från alla sparade rundor.
export default function StatisticsScreen() {
  const runs = savedRuns;

  // Summerar tid och distans för alla rundor med reduce.
  const totalMin = runs.reduce((sum, run) => sum + run.durationMin, 0);
  const totalKm = runs.reduce((sum, run) => sum + run.distanceKm, 0);

  // Längsta rundan: map ger en lista med bara distanserna, Math.max tar
  // den största. 0:an gör att det blir 0 (inte -Infinity) utan rundor.
  const distances = runs.map((run) => run.distanceKm);
  const longestKm = Math.max(0, ...distances);

  // Km per vecka för de senaste 6 veckorna, och den största veckan så
  // att staplarna kan skalas mot den.
  const weeks = getWeeklyKm(runs, 6);
  const maxWeekKm = Math.max(...weeks.map((week) => week.km));

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.grid}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{formatKm(Math.round(totalKm * 10) / 10)}</Text>
          <Text style={styles.statLabel}>km totalt</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{runs.length}</Text>
          <Text style={styles.statLabel}>{runs.length === 1 ? "runda" : "rundor"}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{formatPace(totalKm, totalMin)}</Text>
          <Text style={styles.statLabel}>snittempo min/km</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{formatKm(longestKm)}</Text>
          <Text style={styles.statLabel}>km längsta runda</Text>
        </View>
      </View>

      <Text style={styles.heading}>Km per vecka</Text>
      <View style={styles.chart}>
        {weeks.map((week) => (
          <WeekBar
            key={week.label}
            label={week.label}
            km={week.km}
            maxKm={maxWeekKm}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.field,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
  },
  statBox: {
    width: "47%",
    flexGrow: 1,
    backgroundColor: colors.lane,
    borderRadius: radius,
    borderLeftWidth: 6,
    borderLeftColor: colors.ginger,
    padding: spacing.md,
  },
  statValue: {
    fontFamily: fonts.number,
    fontSize: 36,
    color: colors.pine,
  },
  statLabel: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.muted,
  },
  heading: {
    fontFamily: fonts.number,
    fontSize: 24,
    color: colors.pine,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  chart: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: colors.lane,
    borderRadius: radius,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm + 4,
    paddingHorizontal: spacing.sm,
  },
});
