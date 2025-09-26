## Formalia:
* Gruppemedlemmer: Thea Louise Skou
* En kort instruktion i hvordan man kører jeres tests: 
    - For at teste trainValidator-funktionen: `$ node TrainValidator.test.js `
    - For at teste trainFixer-funktionen: `$ node TrainFixer.test.js`
* Tekstafsnit til delopgave 4 om køretidskompleksitet:

## Argumentér for hvilken Big-O (asymptotisk) køretid Trainfixer-funktionen har.
For at kunne sortere rækkefølgen af togvognene i en linket liste, er funktionen nødt til at løbe hele *toget* (den linkede liste) igennem, hvilket tager O(n) tid. Da en linket liste ikke giver mulighed for random access, og er nødt til at gennemgå alle noder sekventielt, er den teoretisk bedst mulige performance for denne funktion derfor: O(n).

Optimalt set, skal funktionen sortere togvogne samtidigt med at toget gennemløbes, så det ikke skal traversere igennem listen flere gange, og gøre konstantfaktoren større end nødvendigt. Det kan have en betydning for kontantfaktoren, når der fx. skal tjekkes om der mangler et lokomotiv bagerst i toget, om funktionen skal traversere gennem hele toget igen, for at nå frem til sidste togvogn. Den mest optimale konstantfaktor for denne funktion er derfor 1.

I min version af TrainFixer funktionen, traverseres toget én gang når data i noderne kategoriseres og indsamles. Derefter samles togsættet efter reglerne for korrekt rækkefølge i en ny linket liste, baseret på den indsamlede datamængde fra det oprindelige togsæt, som derefter returneres, og udgør det fiksede togsæt. Dette giver en samlet køretid på O(n).

## Tæl desuden hvor mange gange funktionen løber hele toget igennem.
Konstantfaktoren for TrainFixer funktionen er 1, da toget kun gennemløbes én gang.

## Overvej hvilke fordele og ulemper der er ved at den har ét gennemløb vs. flere gennemløb.
**Ét gennemløb:**
`+` Funktionen performer hurtigere, da den skal foretage færre operationer. \
`-` Den bruger mere memory på at gemme data. \
`-` Sværere at debugge, fordi alt sker på én gang. \

**Flere gennemløb:**
`+` Bedre læsbarhed. \
`+` Nemmere at debugge pga. lavere kompleksitet. \
`+` Bruger mindre memory, fordi der ikke er behov for at gemme data ved flere gennemløb. \
`-` Performer langsommere, fordi den skal traversere gennem listen flere gange. \

Man kan argumentere for at læsbarhed mv. bør prioriteres højere end performance i en funktion som denne, der arbejder med små datamængder (Et togsæt er vel sjældent meget langt?), hvor forbedringen af wall-clock-time sammenlignet med en lignende funktion med konstanfaktor på fx 5, nok ikke vil kunne bemærkes alligvel.