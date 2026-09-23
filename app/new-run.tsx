import { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import { Accelerometer } from "expo-sensors";
import ConfettiCannon from "react-native-confetti-cannon";
import { Ionicons } from "@expo/vector-icons";
import { addRun } from "../data/runs";
import { Coords, Run } from "../types/run";
import { getCurrentWeather } from "../services/weather";
import { getCurrentLocation } from "../services/location";
import { colors, fonts, radius, spacing } from "../constants/theme";

// Hur kraftig rörelse (i g) som räknas som en skakning, och hur lång
// paus (ms) som måste gå mellan två skakningar så det inte triggar flera
// gånger på en enda rörelse.
const SHAKE_THRESHOLD = 1.7;
const SHAKE_COOLDOWN_MS = 1000;

export default function NewRunScreen() {
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [location, setLocation] = useState<Coords | null>(null);
  const lastShakeAt = useRef(0);
  const [showConfetti, setShowConfetti] = useState(false);

  // Prenumererar på accelerometern och räknar ut "rörelsestyrkan" (g).
  // Skakar man telefonen tillräckligt hårt nollställs formuläret.
  useEffect(() => {
    Accelerometer.setUpdateInterval(200);
    const subscription = Accelerometer.addListener(({ x, y, z }) => {
      const strength = Math.sqrt(x * x + y * y + z * z);
      const now = Date.now();
      if (
        strength > SHAKE_THRESHOLD &&
        now - lastShakeAt.current > SHAKE_COOLDOWN_MS
      ) {
        lastShakeAt.current = now;
        clearForm();
      }
    });
    return () => subscription.remove();
  }, []);

  function clearForm() {
    setDistance("");
    setDuration("");
    setLocation(null);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  }

  return (
    <View style={styles.container}>
      <View style={styles.fieldsRow}>
        <View style={styles.field}>
          <Text style={styles.label}>Distans</Text>
          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              value={distance}
              onChangeText={setDistance}
              keyboardType="decimal-pad"
              placeholder="5.2"
              placeholderTextColor={colors.line}
            ></TextInput>
            <Text style={styles.inputUnit}>km</Text>
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Tid</Text>
          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              value={duration}
              onChangeText={setDuration}
              keyboardType="number-pad"
              placeholder="30"
              placeholderTextColor={colors.line}
            ></TextInput>
            <Text style={styles.inputUnit}>min</Text>
          </View>
        </View>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.secondaryButton,
          pressed && styles.pressed,
        ]}
        onPress={async () => {
          const result = await getCurrentLocation();
          setLocation(result);
        }}
      >
        <Ionicons name="location" size={20} color={colors.ginger} />
        <Text style={styles.secondaryButtonText}>
          {location ? "Uppdatera position" : "Hämta position"}
        </Text>
      </Pressable>
      <Text style={styles.locationText}>
        {location
          ? `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`
          : "Ingen position hämtad. Med position sparas även vädret."}
      </Text>

      <View style={styles.spacer} />

      <View style={styles.hintRow}>
        <Ionicons name="phone-portrait-outline" size={16} color={colors.muted} />
        <Text style={styles.hint}>Skaka telefonen för att rensa</Text>
      </View>

      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        onPress={async () => {
          const weather = location ? await getCurrentWeather(location) : null;

          const newRun: Run = {
            id: Date.now().toString(), // Enkelt unikt id.
            date: new Date().toISOString().slice(0, 10), // Dagens Datum
            distanceKm: parseFloat(distance) || 0, // Text -> Nummer
            durationMin: parseInt(duration, 10) || 0,
            location: location ?? undefined, // Platstjänster
            weather: weather ?? undefined,
          };
          addRun(newRun);

          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

          setShowConfetti(true);
          // Väntar 1,5 sekunder så konfettin hinner synas innan vi
          // navigerar tillbaka till startsidan.
          setTimeout(() => router.back(), 1500);
        }}
      >
        <Ionicons name="checkmark" size={22} color={colors.pine} />
        <Text style={styles.buttonText}>Spara löprunda</Text>
      </Pressable>

      {showConfetti && (
        <ConfettiCannon
          count={200}
          origin={{ x: 200, y: 0 }}
          fadeOut
          colors={[colors.ginger, colors.pine, colors.muted, "#F5C26B"]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 40,
    backgroundColor: colors.field,
  },
  fieldsRow: {
    flexDirection: "row",
    gap: spacing.md,
  },
  field: {
    flex: 1,
  },
  label: {
    fontFamily: fonts.bodyMedium,
    fontSize: 15,
    color: colors.muted,
    marginBottom: spacing.xs + 2,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "baseline",
    backgroundColor: colors.lane,
    borderRadius: radius,
    borderWidth: 1,
    borderColor: colors.line,
    paddingHorizontal: spacing.md,
  },
  input: {
    flex: 1,
    fontFamily: fonts.number,
    fontSize: 40,
    color: colors.pine,
    paddingVertical: spacing.sm,
  },
  inputUnit: {
    fontFamily: fonts.body,
    fontSize: 16,
    color: colors.muted,
  },
  secondaryButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.lane,
    borderRadius: radius,
    borderWidth: 2,
    borderColor: colors.ginger,
    paddingVertical: 14,
    marginTop: spacing.lg,
  },
  secondaryButtonText: {
    fontFamily: fonts.bodyBold,
    fontSize: 16,
    color: colors.pine,
  },
  locationText: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.muted,
    marginTop: spacing.sm,
    textAlign: "center",
  },
  spacer: {
    flex: 1,
  },
  hintRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.xs + 2,
    marginBottom: spacing.md,
  },
  hint: {
    fontFamily: fonts.body,
    fontSize: 14,
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
  buttonText: {
    fontFamily: fonts.bodyBold,
    fontSize: 18,
    color: colors.pine,
  },
  pressed: {
    opacity: 0.8,
  },
});
