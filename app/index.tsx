import { useCallback, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { router, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import RunListItem from "../components/RunListItem";
import { Run } from "../types/run";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { savedRuns, loadRuns } from "../data/runs";
import { colors, fonts, radius, spacing } from "../constants/theme";
import { formatKm } from "../utils/format";

export default function HomeScreen() {
  const [runs, setRuns] = useState<Run[]>(loadRuns);
  const insets = useSafeAreaInsets();

  useFocusEffect(
    useCallback(() => {
      setRuns([...savedRuns]);
    }, []),
  );

  // Summerar alla rundors distans till en total, t.ex. 25.4 km.
  const totalKm = runs.reduce((sum, run) => sum + run.distanceKm, 0);
  const roundedTotal = Math.round(totalKm * 10) / 10;

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top + spacing.lg, paddingBottom: insets.bottom + spacing.md },
      ]}
    >
      <View style={styles.titleRow}>
        <Text style={styles.title}>GingerRun</Text>
        <Pressable
          onPress={() => router.push("/statistics")}
          hitSlop={12}
          style={({ pressed }) => [styles.statsButton, pressed && styles.buttonPressed]}
        >
          <Ionicons name="stats-chart" size={22} color={colors.pine} />
        </Pressable>
      </View>
      <Text style={styles.summary}>
        {runs.length} {runs.length === 1 ? "runda" : "rundor"} ·{" "}
        {formatKm(roundedTotal)} km totalt
      </Text>

      <FlatList
        data={runs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RunListItem
            run={item}
            onPress={() => router.push(`/run/${item.id}`)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>Inga rundor än</Text>
            <Text style={styles.emptyText}>
              Tryck på Ny löprunda för att logga ditt första pass.
            </Text>
          </View>
        }
        contentContainerStyle={styles.list}
      />

      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={() => router.push("/new-run")}
      >
        <Ionicons name="add" size={24} color={colors.pine} />
        <Text style={styles.buttonText}>Ny löprunda</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.field,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statsButton: {
    backgroundColor: colors.lane,
    borderRadius: radius,
    padding: spacing.sm + 2,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 48,
    color: colors.pine,
    lineHeight: 52,
  },
  summary: {
    fontFamily: fonts.bodyMedium,
    fontSize: 16,
    color: colors.muted,
    marginBottom: spacing.lg,
  },
  list: {
    paddingBottom: spacing.md,
  },
  empty: {
    paddingVertical: spacing.xl,
  },
  emptyTitle: {
    fontFamily: fonts.number,
    fontSize: 24,
    color: colors.pine,
    marginBottom: spacing.xs,
  },
  emptyText: {
    fontFamily: fonts.body,
    fontSize: 16,
    color: colors.muted,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.ginger,
    borderRadius: radius,
    paddingVertical: spacing.md,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    fontFamily: fonts.bodyBold,
    fontSize: 18,
    color: colors.pine,
  },
});
