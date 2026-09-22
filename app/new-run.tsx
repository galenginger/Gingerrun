import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import { addRun } from "../data/mockRuns";
import { Run } from "../types/run";

export default function NewRunScreen() {
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Distans (km)</Text>
      <TextInput
        style={styles.input}
        value={distance}
        onChangeText={setDistance}
        keyboardType="decimal-pad"
        placeholder="5.2"
      ></TextInput>

      <Text style={styles.label}>Tid (minuter)</Text>
      <TextInput
        style={styles.input}
        value={duration}
        onChangeText={setDuration}
        keyboardType="number-pad"
      ></TextInput>

      <Pressable
        style={styles.button}
        onPress={() => {
            const newRun: Run = {
                id: Date.now().toString(), // Enkelt unikt id.
                date: new Date().toISOString().slice(0, 10), // Dagens Datum
                distanceKm: parseFloat(distance) || 0, // Text -> Nummer
                durationMin: parseInt(duration, 10) || 0,
            };
            addRun(newRun);
            
            // console.log("Provar haptics...");
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
              // .then(() => console.log("Haptics klart"))
              // .catch((err) => console.log("Haptics fel:", err));

            router.back();
        }}
      >
        <Text style={styles.buttonText}>Spara löprunda</Text>
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
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 6,
    marginTop: 16,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#eee",
  },
  button: {
    backgroundColor: "#e8622c",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 32,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
