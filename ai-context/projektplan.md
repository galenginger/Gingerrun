React Native Inlämning 1 – Projektplan

Projekt

Arbetsnamn: GingerRun

Teknik:

• React Native
• Expo
• TypeScript
• Expo Router
• Git + GitHub

Målet

Bygga en liten men genomarbetad löparapp för React Native-kursen.

Appen ska först uppfylla alla G-krav. Därefter bygger vi vidare med VG-kraven.

En eventuell integration med min CMF Watch Pro 2 blir ett bonusmål och får endast byggas om grundappen redan fungerar.

---

Fas 1 – Grundläggande React Native

Mål: Lära mig React Native genom att själv skriva så mycket kod som möjligt.

Bygga:

• Startsida
• Lista över löprundor
• Skapa ny löprunda
• Detaljsida för en löprunda

Lära mig:

• View
• Text
• Pressable
• TextInput
• FlatList
• Image
• useState
• props
• TypeScript
• styling i React Native

Minst 4 RN-komponenter ska användas på ett naturligt sätt.

---

Fas 2 – Expo Router

Implementera filbaserad navigation med Expo Router.

Exempel:

app/
├── _layout.tsx
├── index.tsx
├── new-run.tsx
├── statistics.tsx
└── run/
    └── [id].tsx

Detaljsidan ska ta emot ett ID.

Exempel:

run/123

och använda:

useLocalSearchParams()

för att läsa parametern.

Navigationen ska ha ett faktiskt syfte och inte bara finnas för att uppfylla ett krav.

---

Fas 3 – Expo SDK-moduler

Använd minst 4 Expo SDK-moduler.

Planerade moduler:

expo-location

Används för GPS och position.

Möjlig användning:

• Hämta aktuell position
• Använda positionen under en löprunda

expo-haptics

Används för haptisk feedback.

Exempel:

Starta löprunda → vibration.

Stoppa löprunda → vibration.

expo-sensors

Används för telefonens sensorer.

Undersök lämplig användning som faktiskt passar appen.

expo-notifications

Används för lokala notifikationer.

Exempel:

Påminnelse om löpträning.

Alla fyra moduler ska faktiskt användas i appen och dokumenteras i README.

---

Fas 4 – VG: Web API

Appen ska hämta data från ett Web API.

Planerad funktion:

Väder under löprundan

Appen använder positionen för att hämta väderinformation.

Exempel:

Löprunda

Distans: 10.2 km
Tid: 1:08:32
Tempo: 6:43 min/km

Väder:
14°C
Vind: 4 m/s

Syftet är att visa att jag kan:

• göra ett API-anrop
• ta emot JSON
• hantera data
• visa data i React Native

---

Fas 5 – VG: Extern React Native-modul

Använd ytterligare en extern modul från reactnative.directory.

Innan installation ska modulen kontrolleras för:

• Expo Go
• New Architecture
• Kompatibilitet med aktuell Expo-version

Modulen ska fylla en faktisk funktion i appen.

Denna del byggs först när grundappen fungerar.

---

Fas 6 – Git och GitHub

Git ska användas under hela projektet.

Jag ska göra commits löpande istället för att lägga allt i en enda commit i slutet.

Exempel:

Initial Expo project
Add home screen
Add run list
Add navigation
Add run details
Add Expo Location
Add Haptics
Add Notifications
Add Sensors
Add weather API
Add external module
Update README
Final cleanup

Projektet ska finnas i ett publikt GitHub-repository.

".git" ska finnas kvar i projektmappen vid inlämning.

---

Fas 7 – README

README.md ska innehålla:

1. Titel

GingerRun

2. Beskrivning

Vad appen gör och vem den är till för.

3. Installation

Steg för steg:

git clone
npm install
npx expo start

och hur appen startas i Expo Go.

4. RN-komponenter

Lista komponenterna och förklara vad de används till.

5. Expo SDK-moduler

Lista modulerna och förklara vad de används till.

6. Uppfyllda krav

Checklista för G och VG.

7. AI-användning

Dokumentera:

• Vilka AI-verktyg som använts
• Vad AI användes till
• Vilken kod AI hjälpte till med
• Hur koden verifierades
• Vad jag själv förstod och ändrade

---

Fas 8 – CMF Watch Pro 2

Detta är ett bonusmål och ska INTE riskera inlämningen.

När resten av appen fungerar undersöker vi möjligheten att kommunicera med CMF Watch Pro 2 via Bluetooth.

Möjlig framtida funktion:

CMF Watch Pro 2
       ↓
   Bluetooth
       ↓
React Native
       ↓
 GingerRun

Möjliga data:

• Puls
• Steg
• Distans
• Kalorier
• Sömn
• SpO₂

Detta är en avancerad del eftersom CMF Watch Pro 2 inte är en vanlig Wear OS-klocka och eventuell integration kan kräva ett inofficiellt/reverse-engineerat Bluetooth-protokoll.

Om detta blir för svårt prioriteras alltid skolans krav framför klockintegrationen.

---

Arbetsmetod med Claude Code

Claude Code ska användas som ett hjälpmedel, inte som en ersättning för att förstå koden.

Arbetsprincip:

1. Förstå vad som ska byggas.
2. Försöka skriva koden själv.
3. Använd Claude Code när jag fastnar.
4. Be Claude förklara lösningen.
5. Kontrollera koden själv.
6. Testa funktionen.
7. Ändra koden själv där det behövs.
8. Committ:a när en tydlig del fungerar.

Jag ska kunna förklara koden på presentationen.

Jag ska inte lägga in stora mängder AI-genererad kod som jag inte förstår.

---

Prioriteringsordning

PRIORITET 1

Appen ska fungera.

PRIORITET 2

Alla G-krav ska vara uppfyllda.

PRIORITET 3

Web API + extern modul för VG.

PRIORITET 4

README och dokumentation.

PRIORITET 5

Presentation.

BONUS

CMF Watch Pro 2.

---

Slutmål

En liten, snygg och fungerande löparapp där jag själv kan förklara:

• React Native
• TypeScript
• Expo
• Expo Router
• Navigation
• Parametrar
• React hooks
• RN-komponenter
• Expo SDK-moduler
• Web API
• Git/GitHub
• Extern RN-modul
• AI-användning

Appen behöver inte vara stor.

Fokus är att den ska vara fungerande, begriplig och genomförd på ett sätt som jag själv kan försvara på presentationen.

Deadline

Onsdag 7 oktober 2026 kl. 20:00

Presentation samma dag.

Kompletteringsdeadline:

Onsdag 28 oktober 2026 kl. 20:00