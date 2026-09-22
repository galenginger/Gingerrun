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
(Fyll i här när du kört `npx expo start` och sett att startsidan laddar,
och läst igenom filerna.)

**Vad jag ändrade eller la till själv:**
(Fyll i när du skrivit klart de tre TODO:s i app/index.tsx.)

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
