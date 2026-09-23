# GingerRun

En liten löparapp byggd med React Native, Expo och TypeScript som skolprojekt
i kursen Applikationsutveckling (APP).

## Beskrivning

GingerRun är till för dig som vill logga dina löprundor snabbt och enkelt.
Du registrerar distans och tid, hämtar valfritt din position och det
aktuella vädret, och kan i efterhand bläddra i en lista av tidigare rundor
med detaljer om varje pass. Rundor du inte vill ha kvar kan du ta bort,
och på statistiksidan ser du din totala distans, ditt snittempo och hur
många km du sprungit per vecka.
Rundorna sparas på enheten och finns kvar mellan app-starter.

## Så bygger och kör du projektet

1. Klona projektet:
   ```
   git clone https://github.com/galenginger/Gingerrun.git
   cd Gingerrun
   ```
2. Installera beroenden:
   ```
   npm install
   ```
3. Starta Expo:
   ```
   npx expo start
   ```
4. Skanna QR-koden som visas i terminalen med **Expo Go**-appen
   (finns på App Store / Google Play) för att öppna GingerRun på din
   telefon.

## Använda RN-komponenter

| Komponent | Används till |
|---|---|
| `View` | Layout/behållare för alla skärmar |
| `Text` | All text: rubriker, statistik, etiketter |
| `Pressable` | Alla knappar: spara runda, navigera, hämta position, ta bort runda |
| `TextInput` | Mata in distans och tid för en ny löprunda |
| `FlatList` | Listar sparade löprundor på startsidan |
| `ScrollView` | Gör statistiksidan scrollbar |

## Använda Expo SDK-moduler

| Modul | Används till |
|---|---|
| `expo-haptics` | Vibrationsfeedback när en runda sparas eller formuläret nollställs |
| `expo-location` | Hämtar telefonens position för att spara var löprundan gjordes |
| `expo-sensors` | Accelerometern känner av en skakning och nollställer formuläret |
| `expo-file-system` | Sparar löprundorna till en JSON-fil på enheten så de finns kvar mellan app-starter |

## Web API

Väderdata hämtas från [Open-Meteo](https://open-meteo.com/) baserat på
positionen som sparas på rundan (temperatur och vindstyrka), och visas på
rundans detaljsida.

## Extern modul

`react-native-confetti-cannon` från
[reactnative.directory](https://reactnative.directory/).

Visar konfetti på skärmen när man sparar en ny löprunda, som en liten
belöning för passet. Modulen är skriven i ren JavaScript utan egen
native-kod, så den fungerar i Expo Go och påverkas inte av React Natives
New Architecture.

## Navigering

Appen använder Expo Router för filbaserad navigation:

- `/` – startsida med lista över sparade rundor
- `/new-run` – formulär för att skapa en ny löprunda
- `/run/[id]` – detaljsida för en specifik runda, tar emot rundans id som
  parameter via `useLocalSearchParams()`
- `/statistics` – statistik över alla rundor: totalt, snittempo, längsta
  runda och km per vecka

## Projektstruktur

```
app/            Skärmar. Expo Router gör varje fil här till en sida.
  index.tsx       Startsida med listan över löprundor
  new-run.tsx     Formulär för att skapa en ny löprunda
  run/[id].tsx    Detaljsida för en runda, tar emot id som parameter
  statistics.tsx  Statistik och veckodiagram
components/     Återanvändbara UI-delar
  RunListItem.tsx En rad i listan på startsidan (tar emot en runda via props)
  WeekBar.tsx     En stapel i veckodiagrammet (tar emot km och maxKm via props)
services/       Kod som pratar med telefonen eller internet, utan UI
  location.ts     Hämtar positionen med expo-location
  weather.ts      Hämtar väder från Open-Meteo
data/
  runs.ts         Håller listan med rundor och sparar/läser den från disk
types/
  run.ts          TypeScript-typerna Run, Coords och Weather
constants/
  theme.ts        Färger, typsnitt och avstånd som alla skärmar delar
utils/
  format.ts       Gör om data till text: datum, tempo, decimaltecken
  stats.ts        Räknar ut km per vecka till statistiksidan
```

Skärmarna i `app/` innehåller bara det som syns på skärmen. Allt annat
ligger utanför `app/`, eftersom Expo Router annars skulle tolka filerna
som egna sidor.

## Design

Appen har ett eget tema, "Löparbanan": en orange banlinje till vänster på
varje runda och stora kondenserade siffror som på ett startnummer. Alla
färger och typsnitt ligger i `constants/theme.ts`.

- Typsnitt: Barlow och Barlow Condensed från Google Fonts, laddade med
  `expo-font` och `@expo-google-fonts`
- Ikoner: Ionicons från `@expo/vector-icons`

## Uppfyllda krav

### Godkänt (G)

- [x] Minst 4 RN-komponenter och minst 4 Expo SDK-moduler
- [x] Komponenter och moduler dokumenterade ovan
- [x] Expo Router används, en skärm tar emot en parameter (`run/[id].tsx`)
- [x] Git och GitHub använt med commits spridda över arbetets gång
- [x] README.md enligt kraven
- [ ] Inlämnad i tid
- [ ] Muntlig presentation genomförd

### Väl godkänt (VG)

- [x] Alla G-krav uppfyllda
- [x] Extra extern modul från reactnative.directory (`react-native-confetti-cannon`)
- [x] Web API (väderdata från Open-Meteo)
- [x] AI-användning dokumenterad (se nedan och [AI-LOG.md](AI-LOG.md))

## AI-användning

Claude Code har använts som hjälpmedel genom hela projektet, enligt
kursens AI-regel: *"AI får skriva, du måste förstå och verifiera."*

- **Vilka verktyg:** Claude Code (Anthropic).
- **Vad AI användes till:** skelett, konfiguration, Expo SDK-boilerplate
  (t.ex. permission-anrop, fetch mot väder-API:et) och struktur för nya
  filer. Inlärningskritisk kod — `useState`, `Pressable`/`onPress`-logik,
  villkorlig rendering i JSX, styling — skrevs av mig själv, ofta utifrån
  en TODO-kommentar eller ett litet liknande exempel från Claude.
  Undantaget är den slutliga designen (se Design ovan). När kraven var
  klara lät jag Claude skriva den i en egen branch, som jag sedan gick
  igenom och testade innan den slogs ihop.
- **Hur koden verifierades:** appen kördes i Expo Go efter varje
  färdig del, och funktionerna testades manuellt (t.ex. spara en runda,
  skaka telefonen, stänga och öppna appen igen för att kontrollera att
  data sparats).
- **Vad jag ändrade eller la till själv:** se den detaljerade loggen i
  [AI-LOG.md](AI-LOG.md), som har en post per tillfälle AI användes,
  inklusive vad jag bad om, vad jag skrev själv och hur jag verifierade
  koden.
