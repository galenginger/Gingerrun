import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import RunListItem from "../components/RunListItem";
import { Run } from "../types/run";
import { mockRuns } from "../data/mockRuns";

export default function HomeScreen() {
  // TODO (DU): Skapa ett state för listan med löprundor med useState.
  // Typen är Run[] (se types/run.ts) och den ska starta med mockRuns.
  //
  // Ledtråd: const [namn, setNamn] = useState<Typ>(startvärde)
  //
  const [runs, setRuns] = useState<Run[]>(mockRuns);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GingerRun</Text>
      <FlatList
        data={runs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RunListItem
            run={item}
            onPress={() => router.push(`/run/${item.id}`)}
          />
        )}
      />
      <Pressable style={styles.button} onPress={() => router.push("/new-run")}>
        <Text style={styles.buttonText}> + Ny Löprunda!</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#e8622c",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
