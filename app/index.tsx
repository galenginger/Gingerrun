import { useCallback, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { router, useFocusEffect } from "expo-router";
import RunListItem from "../components/RunListItem";
import { Run } from "../types/run";
import { loadRuns, mockRuns } from "../data/mockRuns";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [runs, setRuns] = useState<Run[]>(loadRuns);
  const insets = useSafeAreaInsets();

  useFocusEffect(
    useCallback(() => {
      setRuns([...mockRuns]);
    }, []),
  );

  
  return (
    <View style={[styles.container, {paddingBottom: insets.bottom}]}>
      <Text style={styles.title}>💎🦄GingerRun💎🦄</Text>
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
        <Text style={styles.buttonText}> Spara Ny Löprunda!💎🦄</Text>
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
