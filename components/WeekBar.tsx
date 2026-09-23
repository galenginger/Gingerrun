import { StyleSheet, Text, View } from "react-native";
import { colors, fonts } from "../constants/theme";
import { formatKm } from "../utils/format";

// En stapel i veckodiagrammet. Precis som RunListItem får den all data
// via props från sin förälder (statistics.tsx).
type WeekBarProps = {
  label: string; // "v.38"
  km: number; // km den veckan
  maxKm: number; // största veckan – den blir 100 % hög
};

// Hur hög (i pixlar) den högsta stapeln får bli.
const MAX_HEIGHT = 140;

export default function WeekBar({ label, km, maxKm }: WeekBarProps) {
  // Stapelns höjd: andelen km / maxKm gånger maxhöjden. Största veckan
  // blir alltså 140 px, en halv så lång vecka 70 px. Utan några km alls
  // (maxKm = 0) blir höjden 0 istället för 0 / 0 = NaN.
  const height = maxKm > 0 ? (km / maxKm) * MAX_HEIGHT : 0;

  return (
    <View style={styles.column}>
      <Text style={styles.km}>{km > 0 ? formatKm(km) : ""}</Text>
      <View style={[styles.bar, { height }]} />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  column: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  km: {
    fontFamily: fonts.number,
    fontSize: 14,
    color: colors.pine,
    marginBottom: 4,
  },
  bar: {
    width: "70%",
    minHeight: 4,
    backgroundColor: colors.ginger,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  label: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
    color: colors.muted,
    marginTop: 6,
  },
});
