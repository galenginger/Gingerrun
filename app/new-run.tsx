import { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import * as Location from "expo-location";
import { Accelerometer } from "expo-sensors";
import ConfettiCannon from "react-native-confetti-cannon";
import { addRun } from "../data/mockRuns";
import { Run } from "../types/run";

type Coords = { latitude: number; longitude: number };
type Weather = { tempC: number; windSpeedMs: number };

// Hur kraftig rörelse (i g) som räknas som en skakning, och hur lång
// paus (ms) som måste gå mellan två skakningar så det inte triggar flera
// gånger på en enda rörelse.
const SHAKE_THRESHOLD = 1.7;
const SHAKE_COOLDOWN_MS = 1000;

// Frågar om lov och hämtar nuvarande position. Expo SDK-boilerplate:
// två await-anrop mot expo-location, inget att skriva själv här.
async function getCurrentLocation(): Promise<Coords | null> {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") return null;

  // Läser telefonens senast kända (cachade) position. Svarar direkt och
  // väcker aldrig GPS:en - det är GPS-fixen som kan hänga sig och kräva
  // omstart av appen, så vi ber bara om en ny fix när cachen är tom.
  const lastKnown = await Location.getLastKnownPositionAsync();

  if (lastKnown) {
    return {
      latitude: lastKnown.coords.latitude,
      longitude: lastKnown.coords.longitude,
    };
  }

  try {
    const position = await Promise.race([
      Location.getCurrentPositionAsync({}),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), 8000),
      ),
    ]);
    return {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
  } catch {
    return null;
  }
}

// Hämtar aktuellt väder för en position från Open-Meteo (gratis, ingen
// API-nyckel behövs). Web API-anrop + JSON-hantering, ren boilerplate.
async function getCurrentWeather(coords: Coords): Promise<Weather | null> {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current_weather=true`;
    const response = await fetch(url);
    const data = await response.json();
    return {
      tempC: data.current_weather.temperature,
      windSpeedMs: data.current_weather.windspeed,
    };
  } catch {
    return null;
  }
}

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
        onPress={async () => {
          const result = await getCurrentLocation();
          setLocation(result);
        }}
      >
        <Text style={styles.buttonText}>Hämta position</Text>
      </Pressable>
      <Text style={styles.label}>
        {location
          ? `${location.latitude}, ${location.longitude}`
          : "Ingen position hämtad"}
      </Text>

      <Pressable
        style={styles.button}
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

          // console.log("Provar haptics...");
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          // .then(() => console.log("Haptics klart"))
          // .catch((err) => console.log("Haptics fel:", err));

          setShowConfetti(true);
          // Väntar 1,5 sekunder så konfettin hinner synas innan vi
          // navigerar tillbaka till startsidan. Boilerplate (setTimeout).
          setTimeout(() => router.back(), 1500);
        }}
      >
        <Text style={styles.buttonText}>Spara Löprunda💎🦄</Text>
      </Pressable>

      {showConfetti && (
        <ConfettiCannon count={200} origin={{ x: 200, y: 0 }} fadeOut />
      )}
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
