# Övningsfrågor inför presentationen

Läs frågan, försök svara högt själv, titta sedan på svaret.
**Mitt svar** är det jag själv sa. **Lägg till** är det som gör svaret komplett.

---

## 1. Var kommer `id` ifrån i `run/[id].tsx`?

```ts
const { id } = useLocalSearchParams();
const run = mockRuns.find((r) => r.id === id);
```

**Mitt svar:**
id skickas i URL:en när användaren trycker på en runda, till exempel
/run/3. useLocalSearchParams() hämtar 3 från URL:en. Appen använder
sedan id:t för att hitta och visa rätt löprunda.

**Lägg till:**
- Filnamnet `[id]` gör att Expo Router behandlar den delen av URL:en
  som en parameter som heter `id`.
- Värdet skickas från startsidan: `router.push(`/run/${item.id}`)` i
  `index.tsx`.
- `find()` går igenom listan och returnerar den första rundan vars id
  matchar. Hittas ingen blir `run` `undefined`, och då visas "Hittade
  ingen löprunda".

---

## 2. Vad gör `return () => subscription.remove()` i accelerometerns `useEffect`?

**Mitt svar:**
Den stänger av lyssnaren när man lämnar skärmen. Utan den skulle t.ex.
5 lyssnare köras samtidigt om man gått in på skärmen 5 gånger, och
formuläret nollställs flera gånger vid en skakning.

**Lägg till:**
- Funktionen som `useEffect` returnerar kallas **cleanup**. Den körs
  när komponenten försvinner.
- Lyssnare som lever kvar i onödan kallas en **minnesläcka**. De drar
  batteri och försöker uppdatera en skärm som inte längre finns.

---

## 3. Varför `useState<Run[]>(loadRuns)` och inte `loadRuns()`?

**Mitt svar:**
Utan parentes skickas funktionen och körs bara första gången.

**Lägg till:**
- Med parenteser körs `loadRuns()` vid **varje** rendering, alltså läses
  filen från disk varje gång, fast React bara använder resultatet
  första gången.
- Mönstret heter **lazy initializer**.

---

## 4. Varför `setRuns([...mockRuns])` och inte `setRuns(mockRuns)`?

**Mitt svar:**
Den skapar en ny array så React märker ändringen.

**Lägg till:**
- React jämför med **referens**. `addRun()` gör `mockRuns.unshift(run)`,
  alltså ändrar den samma array. Samma referens = React tror att
  inget har ändrats och ritar inte om listan.
- `...` (spread) kopierar alla element in i en ny array, och då har den
  en ny referens.

---

## 5. Varför två `await` i `getCurrentWeather()`, och vad händer utan internet?

```ts
const response = await fetch(url);
const data = await response.json();
```

**Mitt svar:**
Första await väntar på svaret, andra väntar på att JSON läses. Utan
internet fångar catch felet och returnerar null, då visas inget väder.

**Lägg till:**
- `fetch` ger först bara svarets "huvud". Innehållet läses in efteråt,
  därför behöver `.json()` också vänta.
- På detaljsidan ser `{run.weather && (...)}` till att väderblocket inte
  renderas alls när vädret saknas, så appen kraschar inte.

---

## Bonus: buggen med vindhastigheten

Open-Meteo skickar vindhastigheten i km/h som standard, men appen visade
den som m/s. Fixen var att lägga till `&windspeed_unit=ms` i URL:en.
Kan vara ett bra exempel i reflektionsdelen: att läsa API-dokumentationen
noga och kontrollera datan mot verkligheten.
