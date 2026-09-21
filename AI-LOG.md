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
