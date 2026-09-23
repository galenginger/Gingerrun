import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Run } from "../types/run";
import { colors, fonts, radius, spacing } from "../constants/theme";
import { formatDate, formatKm, formatPace } from "../utils/format";

// Det här är ett exempel på "props": komponenten tar emot data (run) och
// en funktion (onPress) från sin förälder (index.tsx) istället för att
// hämta datan själv. Det är ett av kraven i uppgiften (minst 4 RN-komponenter
// använda på ett naturligt sätt) - här används View, Text och Pressable.
type RunListItemProps = {
  run: Run;
  onPress: () => void;
};

export default function RunListItem({ run, onPress }: RunListItemProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={styles.content}>
        <Text style={styles.date}>{formatDate(run.date)}</Text>
        <View style={styles.statsRow}>
          <Text style={styles.distance}>
            {formatKm(run.distanceKm)}
            <Text style={styles.unit}> km</Text>
          </Text>
          <Text style={styles.secondary}>
            {run.durationMin}
            <Text style={styles.unit}> min</Text>
          </Text>
          <Text style={styles.secondary}>
            {formatPace(run.distanceKm, run.durationMin)}
            <Text style={styles.unit}> /km</Text>
          </Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.muted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  // Banstrecket till vänster (borderLeft) är appens signatur – som en
  // banlinje på en friidrottsbana.
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.lane,
    borderRadius: radius,
    borderLeftWidth: 6,
    borderLeftColor: colors.ginger,
    paddingVertical: spacing.md,
    paddingLeft: spacing.md,
    paddingRight: spacing.sm,
    marginBottom: spacing.sm + 4,
  },
  cardPressed: {
    opacity: 0.7,
  },
  content: {
    flex: 1,
  },
  date: {
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    color: colors.muted,
    marginBottom: 2,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: spacing.md + 4,
  },
  distance: {
    fontFamily: fonts.number,
    fontSize: 30,
    color: colors.pine,
  },
  secondary: {
    fontFamily: fonts.number,
    fontSize: 20,
    color: colors.pine,
  },
  unit: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.muted,
  },
});
