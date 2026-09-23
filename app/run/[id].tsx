import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { savedRuns, deleteRun } from "../../data/runs";
import { colors, fonts, radius, spacing } from "../../constants/theme";
import { formatDate, formatKm, formatPace } from "../../utils/format";

// Filnamnet [id].tsx gör den här skärmen dynamisk: Expo Router matchar
// t.ex. /run/1 och /run/2 mot samma fil, och skickar med "1" eller "2"
// som en URL-parameter vi kan läsa ut.
export default function RunDetailScreen() {
  const { id } = useLocalSearchParams();
  const run = savedRuns.find((r) => r.id === id);
  const insets = useSafeAreaInsets();

  if (!run) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>
          Hittade ingen löprunda med det id:t.
        </Text>
      </View>
    );
  }

  return (
    <View
      style={[styles.container, { paddingBottom: insets.bottom + spacing.md }]}
    >
      <Text style={styles.date}>{formatDate(run.date)}</Text>

      <Text style={styles.hero}>
        {formatKm(run.distanceKm)}
        <Text style={styles.heroUnit}> km</Text>
      </Text>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{run.durationMin}</Text>
          <Text style={styles.statLabel}>minuter</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>
            {formatPace(run.distanceKm, run.durationMin)}
          </Text>
          <Text style={styles.statLabel}>min/km</Text>
        </View>
      </View>

      {run.weather && (
        <View style={styles.infoRow}>
          <Ionicons
            name="partly-sunny-outline"
            size={22}
            color={colors.ginger}
          />
          <Text style={styles.infoText}>
            {run.weather.tempC}°C, vind {run.weather.windSpeedMs} m/s
          </Text>
        </View>
      )}

      {run.location && (
        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={22} color={colors.ginger} />
          <Text style={styles.infoText}>
            {run.location.latitude.toFixed(4)},{" "}
            {run.location.longitude.toFixed(4)}
          </Text>
        </View>
      )}

      <View style={styles.spacer} />

      <Pressable
        style={({ pressed }) => [
          styles.deleteButton,
          pressed && styles.pressed,
        ]}
        onPress={() => {
          // Fråga först – rundan tas bara bort om man trycker "Ta bort".
          Alert.alert("Ta bort runda?", "Det går inte att ångra.", [
            { text: "Avbryt", style: "cancel" },
            {
              text: "Ta bort",
              style: "destructive",
              onPress: () => {
                deleteRun(run.id);
                router.back();
              },
            },
          ]);
        }}
      >
        <Ionicons name="trash-outline" size={20} color={colors.danger} />
        <Text style={styles.deleteButtonText}>Ta bort runda</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.field,
  },
  notFound: {
    fontFamily: fonts.body,
    fontSize: 16,
    color: colors.muted,
  },
  date: {
    fontFamily: fonts.bodyMedium,
    fontSize: 18,
    color: colors.muted,
  },
  hero: {
    fontFamily: fonts.display,
    fontSize: 88,
    lineHeight: 96,
    color: colors.pine,
  },
  heroUnit: {
    fontFamily: fonts.number,
    fontSize: 32,
    color: colors.muted,
  },
  statsRow: {
    flexDirection: "row",
    gap: spacing.md,
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  statBox: {
    flex: 1,
    backgroundColor: colors.lane,
    borderRadius: radius,
    borderLeftWidth: 6,
    borderLeftColor: colors.ginger,
    padding: spacing.md,
  },
  statValue: {
    fontFamily: fonts.number,
    fontSize: 32,
    color: colors.pine,
  },
  statLabel: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.muted,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm + 4,
    paddingVertical: spacing.sm + 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  infoText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 17,
    color: colors.pine,
  },
  spacer: {
    flex: 1,
  },
  deleteButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.sm,
    borderRadius: radius,
    borderWidth: 2,
    borderColor: colors.danger,
    paddingVertical: 14,
  },
  deleteButtonText: {
    fontFamily: fonts.bodyBold,
    fontSize: 16,
    color: colors.danger,
  },
  pressed: {
    opacity: 0.7,
  },
});
