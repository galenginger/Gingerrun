# AI-logg – GingerRun

Den här filen loggar varje gång AI (Claude) användes i projektet, enligt
kursens AI-regel: "AI får skriva, du måste förstå och verifiera." Fyll i en
ny rad varje gång, helst samma dag som det händer – inte i efterhand.

Mall att kopiera för varje ny rad:

```
## [Datum] – [Kort rubrik]

**Vad jag bad om:**


**Vad AI:n gav mig / gjorde:**


**Hur jag verifierade det:**
(t.ex. körde appen, läste igenom raderna, testade i Expo Go, jämförde med dokumentation)

**Vad jag ändrade eller la till själv:**

```

---




## 2026-09-21 – Projektuppsättning

**Vad jag bad om:**
Sätta upp Expo-projektet (TypeScript + Expo Router), CLAUDE.md med
arbetsregler, AI-LOG.md-mall och startsidan med tre TODO:s jag skulle
skriva själv (useState, FlatList, Pressable/navigation).

**Vad AI:n gav mig / gjorde:**
- `npx create-expo-app` med blank-typescript-mallen
- Installerade expo-router, react-native-safe-area-context,
  react-native-screens, expo-linking, expo-constants
- `app/_layout.tsx` (Stack-navigation, grundskal)
- `app/index.tsx` med tre TODO (DU)-kommentarer
- `components/RunListItem.tsx` som ett färdigt exempel på props
- `types/run.ts` med Run-typen
- `CLAUDE.md` och den här filen

**Hur jag verifierade det:**
Körde `npx expo start` och öppnade appen i Expo Go. Såg att startsidan
laddade med listan över testrundorna, att ett tryck på en runda
navigerade vidare och att knappen tog mig till ny-runda-skärmen. Läste
också igenom filerna AI:n skapat.

**Vad jag ändrade eller la till själv:**
Skrev de tre TODO:s i app/index.tsx: useState<Run[]> som håller listan
med löprundor (startvärde mockRuns), FlatList som renderar
RunListItem för varje runda och navigerar till detaljsidan vid tryck,
och en Pressable-knapp som navigerar till /new-run.

---

## 2026-09-22 – Ny-runda-skärm, detaljsida och riktig sparning

**Vad jag bad om:**
Skelett för app/new-run.tsx (formulär) och app/run/[id].tsx (detaljsida),
samt att koppla ihop "Spara löprunda" så den faktiskt lägger till rundan
i listan på startsidan (inte bara console.log).

**Vad AI:n gav mig / gjorde:**
- Skelett för new-run.tsx och run/[id].tsx med TODO (DU) för
  useState/TextInput, useLocalSearchParams och Array.find()
- data/mockRuns.ts flyttades ut från index.tsx så flera skärmar kan
  dela samma testdata, plus en addRun()-hjälpfunktion
- useFocusEffect-uppsättning i index.tsx (boilerplate) så listan läser
  om mockRuns när man navigerar tillbaka från new-run


**Hur jag verifierade det:**
Körde appen i Expo Go på telefonen. Testade hela flödet: skrev in
distans/tid, tryckte Spara, såg att jag hamnade tillbaka på startsidan
och att den nya rundan syntes i listan. Testade även att trycka på en
runda och komma till rätt detaljsida.

**Vad jag ändrade eller la till själv:**
Skrev useState-raderna, FlatList- och Pressable-JSX:en i index.tsx,
båda TextInput-fälten i new-run.tsx, useLocalSearchParams()+find() i
run/[id].tsx, samt hela onPress-logiken i new-run.tsx (bygga Run-objekt
med parseFloat/parseInt, anropa addRun, router.back()) och
setRuns([...mockRuns]) i useFocusEffect.

---

## 2026-09-22 – Position med expo-location

**Vad jag bad om:**
Lägga till expo-location som fjärde Expo SDK-modul: hämta position när
man skapar en löprunda, spara den på rundan, och visa den på både
ny-runda-skärmen och detaljsidan.

**Vad AI:n gav mig / gjorde:**
- Installerade expo-location (fick lösa en npm-peer-konflikt med
  --legacy-peer-deps, orelaterad till själva paketet)
- Config-plugin i app.json med behörighetstext
- `location`-fält på Run-typen (types/run.ts)
- `getCurrentLocation()`-hjälpfunktion i new-run.tsx (permission +
  getCurrentPositionAsync, ren Expo SDK-boilerplate)
- TODO (DU) för useState och en Pressable som hämtar/sparar position

**Hur jag verifierade det:**
Körde appen i Expo Go, tryckte "Hämta position", såg koordinaterna
skrivas ut, sparade en runda och kollade att positionen syntes på
detaljsidan för den rundan.

**Vad jag ändrade eller la till själv:**
Skrev useState för location, Pressable-knappen med async onPress som
anropar getCurrentLocation() och setLocation(), villkorlig text
({location ? ... : ...}) för att visa koordinaterna, lade till
location i newRun-objektet, och villkorlig rendering ({run.location &&
...}) på detaljsidan. Fick fixa flera syntaxfel själv på vägen
(fel useState-typ, ihopblandad Pressable/onPress-syntax).

---

## 2026-09-22 – expo-notifications bytt mot expo-sensors

**Vad jag bad om:**
En tredje Expo SDK-modul: lokal påminnelse om löpträning med
expo-notifications, enligt projektplanen.

**Vad AI:n gav mig / gjorde:**
- Installerade expo-notifications, satte upp notification handler i
  _layout.tsx och en scheduleRunReminder()-helper i index.tsx
- Upptäckte i test att Expo Go på Android inte stödjer
  expo-notifications alls sedan SDK 53 (kräver development build) —
  städade bort allt det igen (import, helper, knapp, config-plugin,
  avinstallerade paketet)
- Byggde om till expo-sensors istället: Accelerometer-prenumeration
  (useEffect + cleanup) i new-run.tsx som känner av skakning
- TODO (DU) i clearForm()

**Hur jag verifierade det:**
Körde appen i Expo Go, skrev in distans/tid, hämtade position, skakade
telefonen och såg att fälten nollställdes med en vibration.

**Vad jag ändrade eller la till själv:**
Skrev de tre setter-anropen i clearForm() (setDistance, setDuration,
setLocation) och Haptics-raden för bekräftelse.

---

## 2026-09-22 – Spara rundor på disk med expo-file-system

**Vad jag bad om:**
Fjärde Expo SDK-modul. Löprundorna sparades bara i minnet och
försvann när appen stängdes helt — ville lösa det på riktigt.

**Vad AI:n gav mig / gjorde:**
- Installerade expo-file-system
- loadRuns() och saveRuns()-logik i data/mockRuns.ts (nya synkrona
  File/Paths-API:et i SDK 57: exists, textSync, write, create) som
  läser/skriver en runs.json i appens dokumentmapp
- addRun() uppdaterad att spara till disk vid varje ny runda
- TODO (DU) för useState-startvärdet i index.tsx

**Hur jag verifierade det:**
Körde appen, sparade en runda, stängde appen helt (svepte bort den)
och öppnade igen — rundan fanns kvar i listan.

**Vad jag ändrade eller la till själv:**
Bytte useState<Run[]>(mockRuns) mot useState<Run[]>(loadRuns) i
index.tsx (lazy initializer-mönstret, utan att anropa funktionen
direkt).

---

## 2026-09-22 – Väder från Open-Meteo (VG: Web API)

**Vad jag bad om:**
Hämta väderdata baserat på positionen som redan sparas på rundan, och
visa den på detaljsidan — Fas 4/VG-kravet på ett Web API-anrop.

**Vad AI:n gav mig / gjorde:**
- weather-fält (tempC, windSpeedMs) på Run-typen (types/run.ts)
- getCurrentWeather()-funktion i new-run.tsx: fetch mot Open-Meteos
  gratis API (ingen nyckel behövs), tar ut temperatur och vindstyrka
  ur JSON-svaret
- Kopplade in anropet i "Spara löprunda": hämtar väder automatiskt om
  position finns, sparar det på newRun-objektet
- TODO (DU) i run/[id].tsx för att visa run.weather

**Hur jag verifierade det:**
Hämtade position i ny-runda-formuläret, sparade en runda, gick in på
den och såg temperatur och vind visas på detaljsidan.

**Vad jag ändrade eller la till själv:**
Skrev {run.weather && (...)}-blocket i run/[id].tsx som visar
temperatur och vindstyrka, samma villkorliga mönster som
run.location. Fick reda ut några JSX-strul på vägen (en extra
oavslutad <View>, saknad stängning av både villkorsblocket och hela
return-satsen). Lade även till en "Koordinater:"-etikett framför
platsen på egen hand.

---

## 2026-09-23 – Konfetti vid sparad runda (VG: extern modul)

**Vad jag bad om:**
Den sista VG-biten: en extra extern modul från reactnative.directory
som fyller en faktisk funktion. Valde en firningsanimation när en
runda sparas.

**Vad AI:n gav mig / gjorde:**
- Kontrollerade react-native-confetti-cannon innan installation: ren
  JS utan native-kod, funkar därför i Expo Go och påverkas inte av
  New Architecture
- Installerade paketet
- setTimeout(() => router.back(), 1500) i new-run.tsx så navigeringen
  väntar in konfettin, ren boilerplate
- TODO (DU) för useState samt att trigga och rendera konfettin

**Hur jag verifierade det:**
Körde appen, sparade en löprunda och såg konfettin animera innan jag
navigerades tillbaka till startsidan.

**Vad jag ändrade eller la till själv:**
Skrev useState för showConfetti, satte showConfetti(true) i
"Spara löprunda"-knappen, och den villkorliga renderingen
{showConfetti && (<ConfettiCannon .../>)}. Fick först en useState
felplacerad inuti Accelerometer-callbacken (bryter mot Rules of
Hooks) — flyttade den till rätt plats i komponentens kropp.

---

## 2026-09-23 – Buggfix: position gick inte att hämta en andra gång

**Vad jag bad om:**
Jag hittade själv en bugg: efter att ha hämtat position och sparat en
runda gick det inte att hämta position igen — hela appen behövde
startas om. Bad AI:n lokalisera felet och ge mig ett skelett, inte
ett färdigt svar.

**Vad AI:n gav mig / gjorde:**
- Resonerade fram var felet kunde ligga: eftersom komponentens state
  nollställs vid varje ny navigering måste problemet sitta utanför
  React, i själva GPS-anropet
- Föreslog en timeout (Promise.race) runt getCurrentPositionAsync som
  första skyddsnät, så anropet aldrig kan hänga för evigt
- När det inte räckte: föreslog console.log-rader för att bevisa
  exakt var körningen fastnade
- Hittade i Expos egen dokumentation att getCurrentPositionAsync begär
  en helt ny GPS-fix och kan ta lång tid, och att
  getLastKnownPositionAsync rekommenderas när hög precision inte krävs
- Skrev till slut if (lastKnown)-blocket åt mig när jag kört fast, och
  lät mig förklara ordningen tillbaka innan vi gick vidare

**Hur jag verifierade det:**
La in console.log före och efter varje await och läste terminalen:
loggarna visade att permission gick igenom (status = granted) men att
körningen aldrig kom förbi getCurrentPositionAsync. Efter fixen
hämtades positionen direkt, även andra och tredje gången, utan omstart
av appen.

**Vad jag ändrade eller la till själv:**
Körde felsökningen och läste loggarna, och kunde förklara varför
if (lastKnown)-blocket måste ligga före try-blocket: return avbryter
funktionen direkt, så cachen måste kollas innan reservlösningen med
den långsamma GPS-fixen körs.

---

## 2026-09-23 – Ta bort runda, safe area-fix och knapptexter

**Vad jag bad om:**
Tips på hur jag kunde lösa det innan jag började koda: ta bort en
sparad runda, och knappen på startsidan som hamnade under
hemknappsraden.

**Vad AI:n gav mig / gjorde:**
Bara tips och ledtrådar, ingen färdig kod. All kod i commitsen
(a038be0, 6cb9b17, 4f959d6) skrev jag själv. AI:n sammanfattade
också commitsen till den här loggposten i efterhand.

**Hur jag verifierade det:**
Provkörde hela flödet i Expo Go: skapade en runda, gick in på den,
tog bort den och såg att den försvann ur listan. Kollade också att
knappen på startsidan inte längre hamnade under hemknappsraden.

**Vad jag ändrade eller la till själv:**
- `deleteRun(id)` i data/mockRuns.ts: findIndex + splice tar bort
  rundan ur listan, och saveRuns() sparar till disk
- En "Ta bort runda"-knapp (Pressable) på detaljsidan som anropar
  deleteRun() och sedan router.back(), med egen röd styling
- useSafeAreaInsets() i index.tsx och paddingBottom: insets.bottom så
  att knappen inte hamnar under telefonens hemknappsrad
- Nya knapptexter och rubrik, plus en uppdaterad kommentar vid
  accelerometern i new-run.tsx

---

## 2026-09-23 – Buggfix: vindhastighet i fel enhet

**Vad jag bad om:**
Inget. AI:n hittade buggen när vi övade inför presentationen.

**Vad AI:n gav mig / gjorde:**
Påpekade att Open-Meteo skickar vindhastigheten i km/h som standard,
men att detaljsidan visar den som m/s. Tipsade om att API:et har en
parameter windspeed_unit som ska sättas till ms, men skrev inte koden.

**Hur jag verifierade det:**
Sparade en ny runda och jämförde vindhastigheten på detaljsidan med
en väderapp.

**Vad jag ändrade eller la till själv:**
Lade till &windspeed_unit=ms i slutet av URL:en i
getCurrentWeather() i new-run.tsx.

---

## 2026-09-23 – Tydligare filstruktur: services/

**Vad jag bad om:**
Frågade om koden kunde delas upp bättre. new-run.tsx innehöll både
skärmen och två hjälpfunktioner som inte har med UI att göra.

**Vad AI:n gav mig / gjorde:**
- Förklarade att allt i app/ blir en skärm i Expo Router, så annan kod
  ska ligga utanför app/
- Flyttade getCurrentLocation() till services/location.ts och
  getCurrentWeather() till services/weather.ts, och lade till export
- Flyttade typerna Coords och Weather till types/run.ts
- TODO (DU) för import-raderna i new-run.tsx

**Hur jag verifierade det:**
Körde npx tsc --noEmit (inga fel), startade appen och testade att hämta
position och spara en runda med väder.

**Vad jag ändrade eller la till själv:**
Skrev import-raderna för Coords, getCurrentLocation och
getCurrentWeather i new-run.tsx.

---

## 2026-09-23 – Döpa om mockRuns till runs/savedRuns

**Vad jag bad om:**
Filen data/mockRuns.ts sparar riktiga rundor på disk, inte bara
testdata, så namnet var missvisande.

**Vad AI:n gav mig / gjorde:**
Döpte om filen till data/runs.ts med git mv och variabeln mockRuns
till savedRuns inne i filen. Uppdaterade kommentaren och
övningsfrågorna till det nya namnet.

**Hur jag verifierade det:**
Körde npx tsc --noEmit tills alla fel var borta, och kollade att inget
"mockRuns" fanns kvar i koden.

**Vad jag ändrade eller la till själv:**
Uppdaterade importerna i index.tsx, new-run.tsx och run/[id].tsx till
den nya sökvägen, bytte mockRuns mot savedRuns där variabeln används,
och slog ihop loadRuns och savedRuns till en import-rad i index.tsx.

---

## 2026-09-23 – Design och styling (branch `styling`)

**Vad jag bad om:**
Inlämningskraven var klara. Jag ville att appen skulle se ut som en
färdig produkt och gav AI:n fria händer att styla den i en egen branch,
så att master inte påverkades om jag inte gillade resultatet.

**Vad AI:n gav mig / gjorde:**
- Tog fram designriktningen "Löparbanan" med skillen frontend-design:
  färger, typsnitt och en orange banlinje som signatur
- Installerade expo-font, @expo-google-fonts/barlow,
  @expo-google-fonts/barlow-condensed och @expo/vector-icons (alla
  fungerar i Expo Go)
- Skrev constants/theme.ts (färger, typsnitt, avstånd) och
  utils/format.ts (datum, tempo, decimaltecken)
- Skrev om stylingen i alla skärmar och i RunListItem, plus
  typsnittsladdning och headers i _layout.tsx
- Ingen logik ändrades (sparning, GPS, väder, skak, konfetti)

**Hur jag verifierade det:**
npx tsc --noEmit utan fel, testpaketering med npx expo export, och
testade alla skärmar i Expo Go.

**Vad jag ändrade eller la till själv:**
Inga ändringar än, kommer framöver.

---

## 2026-09-23 – Buggfix: decimalkomma i distansen

**Vad jag bad om:**
AI:n påpekade att svenska tangentbord skriver "5,2" med komma, och att
parseFloat("5,2") ger 5 eftersom den slutar läsa vid kommat.

**Vad AI:n gav mig / gjorde:**
En TODO med ledtråd (.replace) och ett liknande exempel. När jag körde
fast skrev AI:n raden parseFloat(distance.replace(",", ".")) åt mig.

**Hur jag verifierade det:**
Skrev in 5,2 i appen, sparade och kollade att listan visade 5,2 km.

**Vad jag ändrade eller la till själv:**
Förklarade raden tillbaka: replace byter kommat mot en punkt, sedan gör
parseFloat om texten till ett nummer, och || 0 ger 0 om fältet är tomt.

---

## 2026-09-23 – Spärra tomma rundor och bekräfta borttagning

**Vad jag bad om:**
Skydda demon mot två misstag: att spara en runda med 0 km, och att
råka ta bort en runda med ett felklick.

**Vad AI:n gav mig / gjorde:**
- TODO:s med steg-för-steg-vägledning i new-run.tsx och run/[id].tsx,
  och importerade Alert
- När jag klistrat in deleteRun/router.back() på fel ställe skrev AI:n
  den färdiga Alert-knappen med onPress åt mig

**Hur jag verifierade det:**
Tryckte "Spara" med tomt distansfält och såg att inget hände. Testade
Avbryt (rundan var kvar) och Ta bort (rundan försvann) i Alert-rutan.

**Vad jag ändrade eller la till själv:**
Skrev const km och if (km === 0) return; i new-run.tsx, och bytte
distanceKm till att använda km. Byggde Alert.alert med titel, text och
de två knapparna i run/[id].tsx. Förklarade tillbaka att onPress i
knappen är en callback som körs först när man trycker, inte direkt.
