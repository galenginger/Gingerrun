import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";

// Den här skärmen tar bara emot input än så länge. Vi kopplar ihop den med
// riktig sparning (dvs. lägga till rundan i listan på startsidan) när vi
// har gått igenom hur man delar state mellan skärmar.
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
          // Steget "spara till listan" bygger vi när vi lärt oss dela
          // state mellan skärmar. Just nu går vi bara tillbaka.
          console.log("Sparar runda:", distance, duration);
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
