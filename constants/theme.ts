// Appens designsystem på ett ställe: färger, typsnitt och avstånd.
// Skärmarna hämtar värden härifrån istället för att hårdkoda dem, så
// ändrar man en färg här ändras den i hela appen.
//
// Tema: "Löparbanan" – banlinjer, startnummer och tydliga siffror.

export const colors = {
  pine: "#1B2A22", // Text och rubriker
  field: "#EEF2EE", // Bakgrund
  lane: "#FFFFFF", // Kort och inputs
  ginger: "#E8871E", // Primärknapp och banstrecket på korten
  muted: "#66756B", // Datum och etiketter
  line: "#D5DDD7", // Tunna kanter
  danger: "#B3261E", // Ta bort
};

// Namnen matchar det som laddas med useFonts() i app/_layout.tsx.
export const fonts = {
  body: "Barlow_400Regular",
  bodyMedium: "Barlow_500Medium",
  bodyBold: "Barlow_600SemiBold",
  number: "BarlowCondensed_700Bold", // Siffror, som ett startnummer
  display: "BarlowCondensed_800ExtraBold", // Stora rubriker
};

export const radius = 12;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};
