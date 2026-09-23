import { Pressable, StyleSheet, Text, View } from "react-native";
import { deleteRun, mockRuns } from "../../data/mockRuns";
import { router, useLocalSearchParams } from "expo-router";

// Filnamnet [id].tsx gör den här skärmen dynamisk: Expo Router matchar
// t.ex. /run/1 och /run/2 mot samma fil, och skickar med "1" eller "2"
// som en URL-parameter vi kan läsa ut.
export default function RunDetailScreen() {
  const { id } = useLocalSearchParams();
  const run = mockRuns.find((r) => r.id === id);

  if (!run) {
    return (
      <View style={styles.container}>
        <Text>Hittade ingen löprunda med det id:t.💎🦄</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{run.date}</Text>
      <Text style={styles.stat}>{run.distanceKm} km</Text>
      <Text style={styles.stat}>{run.durationMin} min</Text>
      {run.location && (
        
        <Text style={styles.date}>
         Kordinater: {run.location.latitude}, {run.location.longitude}
        </Text>
      )}

      {run.weather && (
      <Text style={styles.date}>
      Väder: {run.weather.tempC}°C, vind {run.weather.windSpeedMs} m/s
      </Text>
      )}
      
      <Pressable style={styles.deleteButton} onPress={() => {
        deleteRun(run.id);
        router.back();
      }}>
      <Text style={styles.deleteButtonText}>Ta bort runda💎🦄</Text>
      </Pressable>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
    backgroundColor: "#f5f5f5",
  },
  date: {
    fontSize: 16,
    color: "#666",
    marginBottom: 12,
  },
  
  stat: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 6,
  },

    deleteButton: {
    backgroundColor: "#c0392b",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 32,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },

});
