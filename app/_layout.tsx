import { Stack } from "expo-router";

// Det här är rot-layouten för Expo Router. Den bestämmer det gemensamma
// "skalet" (t.ex. headerns utseende) runt alla skärmar i app/-mappen.
// Vi bygger ut den (t.ex. med fler <Stack.Screen> för egna titlar) när
// new-run.tsx och run/[id].tsx finns på plats.
export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
      }}
    />
  );
}
