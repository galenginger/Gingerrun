import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import {
  Barlow_400Regular,
  Barlow_500Medium,
  Barlow_600SemiBold,
} from "@expo-google-fonts/barlow";
import {
  BarlowCondensed_700Bold,
  BarlowCondensed_800ExtraBold,
} from "@expo-google-fonts/barlow-condensed";
import { colors, fonts } from "../constants/theme";

// Det här är rot-layouten för Expo Router. Den bestämmer det gemensamma
// "skalet" (headerns utseende) runt alla skärmar i app/-mappen, och
// laddar appens typsnitt innan något visas.
export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Barlow_400Regular,
    Barlow_500Medium,
    Barlow_600SemiBold,
    BarlowCondensed_700Bold,
    BarlowCondensed_800ExtraBold,
  });

  // Visa ingenting förrän typsnitten är laddade, annars blinkar texten
  // från systemfonten till Barlow.
  if (!fontsLoaded) return null;

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.field },
        headerTintColor: colors.pine,
        headerTitleStyle: { fontFamily: fonts.display, fontSize: 22 },
        headerTitleAlign: "center",
        headerShadowVisible: false,
        headerBackButtonDisplayMode: "minimal",
        contentStyle: { backgroundColor: colors.field },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="new-run" options={{ title: "Ny löprunda" }} />
      <Stack.Screen name="run/[id]" options={{ title: "Löprunda" }} />
      <Stack.Screen name="statistics" options={{ title: "Statistik" }} />
    </Stack>
  );
}
