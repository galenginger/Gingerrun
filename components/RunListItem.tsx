import { Pressable, StyleSheet, Text, View } from "react-native";
import { Run } from "../types/run";

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
    <Pressable onPress={onPress} style={styles.card}>
      <View>
        <Text style={styles.date}>{run.date}</Text>
        <Text style={styles.stats}>
          {run.distanceKm} km · {run.durationMin} min
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },
  date: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  stats: {
    fontSize: 18,
    fontWeight: "600",
  },
});
