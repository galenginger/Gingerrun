import * as Location from "expo-location";
import { Coords } from "../types/run";

// Frågar om lov och hämtar nuvarande position. Expo SDK-boilerplate:
// två await-anrop mot expo-location, inget att skriva själv här.
export async function getCurrentLocation(): Promise<Coords | null> {
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
