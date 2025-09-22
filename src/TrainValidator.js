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

  if (train.head.data.type !== "locomotive") {
    return false;
  }

  let carCount = 0; 
  let freightCarFound = false;
  let inSleepingSection = false;
  let sleepingSectionFound = false;
  let inSeatingDiningSection = false;
  let seatingDiningSectionFound = false;
  let currentCar = train.head;

  while (currentCar) {
    carCount++;
  
    if (currentCar !== train.head && currentCar.data.type === "locomotive") {
      if (carCount <= 10) {
        return false;
      } else {
        if (currentCar.next !== null) {
          return false;
        }
      }
    }
  
    if (currentCar.data.type === "freightCar") {
      freightCarFound = true;
    }

    if (currentCar.data.type === "passengerCar") {
      if (freightCarFound) {
        return false;
      }

      if (currentCar.data.subtype === "sleepingCar") {
        if (sleepingSectionFound && !inSleepingSection) {

          console.log("sleepingsectionfound, not in sleeping section");
          return false;
        }
        inSleepingSection = true;
        sleepingSectionFound = true;
      } else {
        inSleepingSection = false;
      }
      if (
        currentCar.data.subtype === "seatingCar" ||
        currentCar.data.subtype === "diningCar"
      ) {
        if (seatingDiningSectionFound && !inSeatingDiningSection) {
          return false;
        }
        inSeatingDiningSection = true;
        seatingDiningSectionFound = true;
      } else {
        inSeatingDiningSection = false;
      }
    }
    currentCar = currentCar.next;
  }

  if (carCount > 10) {
    let lastCar = train.head;
    while (lastCar.next) {
      lastCar = lastCar.next;
    }
    if (lastCar.data.type !== "locomotive") {
      return false;
    }
  }

  return true;
}

export { trainValidator };
