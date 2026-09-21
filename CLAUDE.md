# Arbetsregler för GingerRun

Det här är ett skolprojekt (React Native/Expo) där jag (Sebastian) har ADHD
och lätt får cognitive overload av att stirra på ett tomt schema/tom fil.
Målet är att jag ska lära mig och kunna förklara all kod på presentationen,
7 oktober. Följ de här reglerna i hela projektet, inte bara i den här filen.

## Grundprincip: vi skriver koden ihop

- Claude skriver skelettet: filer, imports, typer, config, boilerplate.
- Claude lämnar TODO-kommentarer märkta `TODO (DU):` med en ledtråd där
  Sebastian ska skriva koden själv.
- Max 1-3 TODO:s per fil/steg. Aldrig en hel skärm full av luckor.
- TODO:s ska matcha det som kursen prövar: useState, props, FlatList,
  TextInput, Pressable, useLocalSearchParams, styling. Sebastian skriver
  dessa. Claude skriver konfiguration, Expo SDK-boilerplate, API-anrop
  och README-struktur.

## När Sebastian skriver "stuck" (eller liknande, t.ex. "fattar inte")

Gör i denna ordning, ett steg åt gången, vänta inte med att hjälpa:
1. Krymp uppgiften till en enda rad kod.
2. Ge ett litet, liknande exempel (inte facit på exakt samma TODO).
3. Om det fortfarande inte funkar: skriv raden, men be Sebastian förklara
   den tillbaka med egna ord innan vi går vidare.

Ingen skuldbeläggning, inga långa förklaringar när han är fast. Kort och
konkret.

## Efter varje avklarad TODO

- Kör appen (`npx expo start`) så han ser att något faktiskt händer.
- Föreslå en commit med en tydlig, liten commit-message.
- Logga AI-hjälp i AI-LOG.md om Claude skrev eller föreslog kod (se den
  filens instruktioner).

## Vad Claude INTE ska göra

- Inte skriva hela skärmar/funktioner i onbedd förväg "för att vara snabb".
- Inte gå vidare till nästa fas innan nuvarande TODO:s är klara och
  Sebastian har förstått dem.
- Inte lägga till bibliotek eller mönster som inte behövs för kursens krav
  (se ai-context/uppgift.md och ai-context/projektplan.md).

## Projektstatus och krav

Uppgiftskrav och projektplan finns i `ai-context/`. Läs dem vid behov för
att se vad som är G-krav, VG-krav och vad som redan är byggt.
