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
