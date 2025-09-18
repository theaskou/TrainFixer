// TODO:
// 3. En funktion der kan validere om en vogn er korrekt
// Lav en funktion som validerer om et tog er gyldigt ud fra følgende regler:
// •Lokomotiver:
//      ‣For tog med 10 eller færre vogne er den eneste gyldige placering som forreste vogn.
//      ‣For tog med flere end 10 vogne SKAL der være et lokomotiv både forrest og bagest.
// •Passagervogne: 
//      Skal være foran alle godsvogne. 
//      Der findes tre slags passagervogne:
//          ‣Siddevogne: Ingen særlige regler.
//          ‣Sengevogne: Hvis der er mere end én sengevogn på toget, skal de ligge i forlængelse afhinanden.
//          ‣Spisevogne: Hvis der er en spisevogn, skal det være muligt at gå til den fra alle siddevogne uden at krydse en sengevogn.
// •Godsvogne: Skal være bag alle passagervogne.
// 
// Det er tilstrækkeligt hvis funktionen returnerer sand/falsk.

function trainValidator(train) {
    if (!train || !train.head) {
        return false;
    }
    let carCount = 0;
    let freightCarFound = false;
    let sleepingSectionFound = false;
    let nonSleepingPassengerSectionFound = false;

    let currentCar = train.head;
    while (currentCar.next) {
        carCount ++;        
        currentCar = currentCar.next;

        


    }
    return carCount;



    // traverse train (linked list)

    // carCount til at holde styr på længden (bruges til sidst)

    // ved head: er det et lokomotiv

    // hvis du finder et lokomotiv, der IKKE er head, og IKKE er bagerst i et tog med 11+ vogne: return false

    // godsvognFound (boolean variabel til at holde styr på dét)

    // ved passagervogn: godsvognFound === true: return false


    // ved sengevogn: hvis sengevogneFound er false: hvis next også er sengevogn gå videre til den og tjek om dens next er en sengevogn, etc. indtil next er noget andet;
        // sæt da sengevogneFound til true
    // ved sengevogn: hvis sengevogneFound er true: return false

    // ved passagervogn‣siddevogn: hvis next er sidde eller spise, så tjek om next er sidde eller spise, etc. indtil next er noget andet;
        // sæt da siddeSpiseSectionFound til true
    // same as above kind of…

    // ved godsvogn: sæt godsvognFound til true, traverse next indtil noget andet end godsvogn -> lav tjek på længden, for at tjekke om det sidste er et lokomotiv
        // hvis det ikke opfylder return false (ved tail (og 11+ vogne): er det et lokomotiv)
        // det sidste lokomotiv (hvis gyldigt ift. længden) ikke har next sat til null return false

    // return true ellers
    
}


export { trainValidator }
