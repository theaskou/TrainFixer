## Formalia:

- Gruppemedlemmer: Thea Louise Skou
- En kort instruktion i hvordan man kører jeres tests:
  - For at teste trainValidator-funktionen: `$ node tests/TrainValidator.test.js `
  - For at teste trainFixer-funktionen: `$ node tests/TrainFixer.test.js`
- Tekstafsnit til delopgave 4 om køretidskompleksitet:

## Argumentér for hvilken Big-O (asymptotisk) køretid Trainfixer-funktionen har.

For at kunne sortere rækkefølgen af togvognene i en linket liste, er funktionen nødt til at løbe hele _toget_ (den linkede liste) igennem, hvilket tager O(n) tid. Da en linket liste ikke giver mulighed for random access, og er nødt til at gennemgå alle noder sekventielt, er den teoretisk bedst mulige performance for denne funktion derfor: O(n).

I min version af TrainFixer funktionen, traverseres toget én gang når data i noderne kategoriseres og indsamles i nye linkede lister. Derefter samles togsættet efter reglerne for korrekt rækkefølge i en ny linket liste, som udgør det reparerede togsæt. Dette giver en samlet køretid på O(n).

## Tæl desuden hvor mange gange funktionen løber hele toget igennem.

TrainFixer funktionen løber hele toget igennem 1 gang, hvilket opnås ved at kategorisere og sortere togets vogne i sektioner som nye linkede lister, som derefter forbindes i den rigtige rækkefølge, ved at holde styr på head og tail på hver sektion. På den måde er der ikke behov for at traversere gennem togsættet mere end 1 gang.

## Overvej hvilke fordele og ulemper der er ved at den har ét gennemløb vs. flere gennemløb.

**Ét gennemløb:** \
`+` Funktionen performer hurtigere, da den skal foretage færre operationer. \
`-` Den bruger mere memory på at gemme data. \
`-` Sværere at debugge, fordi alt sker på én gang.

**Flere gennemløb:** \
`+` Bedre læsbarhed. \
`+` Nemmere at debugge pga. lavere kompleksitet. \
`+` Bruger mindre memory, fordi der ikke er behov for at gemme data ved flere gennemløb. \
`-` Performer langsommere, fordi den skal traversere gennem listen flere gange.

Man kan argumentere for at læsbarhed mv. bør prioriteres højere end performance i en funktion som denne, der arbejder med små datamængder, hvor forbedringen af wall-clock-time sammenlignet med flere operationer, nok ikke vil kunne bemærkes alligvel. Hvis der skal laves rigtigt mange togsæt, eller meget lange togsæt, kan det have en betydning.
