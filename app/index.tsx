import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import RunListItem from "../components/RunListItem";
import { Run } from "../types/run";

// Testdata så listan inte är tom medan vi bygger. När new-run.tsx finns
// (Fas 2) byter vi ut det här mot riktiga rundor som sparas.
const mockRuns: Run[] = [
  { id: "1", date: "2026-09-18", distanceKm: 5.2, durationMin: 28 },
  { id: "2", date: "2026-09-20", distanceKm: 10.1, durationMin: 58 },
];

export default function HomeScreen() {
  // TODO (DU): Skapa ett state för listan med löprundor med useState.
  // Typen är Run[] (se types/run.ts) och den ska starta med mockRuns.
  //
  // Ledtråd: const [namn, setNamn] = useState<Typ>(startvärde)
  //
  // const [runs, setRuns] = useState<Run[]>(???);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GingerRun</Text>

      {/*
        TODO (DU): Rendera listan med löprundor med FlatList.
        - data={runs}
        - keyExtractor={(item) => item.id}
        - renderItem={({ item }) => (
            <RunListItem
              run={item}
              onPress={() => router.push(`/run/${item.id}`)}
            />
          )}

        Ledtråd: FlatList tar samma props som du ser i punktlistan ovan.
        Testa gärna: console.log(item) inuti renderItem om du vill se
        vad som skickas in innan du skriver klart.
      */}

      {/* TODO (DU): Skapa en knapp med Pressable som navigerar till
          "/new-run" när man trycker på den (den skärmen bygger vi näst).
          Ledtråd:
          <Pressable style={styles.button} onPress={() => router.push("/new-run")}>
            <Text style={styles.buttonText}>+ Ny löprunda</Text>
          </Pressable>
      */}
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
