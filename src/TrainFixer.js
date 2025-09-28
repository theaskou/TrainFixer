import { createLinkedList } from "./LinkedList.js";
import { createTrainCar } from "./Trains.js";

function trainFixer(train) {
  if (!train.head) {
    return false;
  }

  let locomotiveOne = createLinkedList();
  let diningSection = createLinkedList();
  let seatingSection = createLinkedList();
  let sleepingSection = createLinkedList();
  let freightSection = createLinkedList();
  let locomotiveTwo = createLinkedList();

  let currentCar = train.head;
  let carCount = 0;

  while (currentCar) {
    carCount++;

    switch (currentCar.data.type) {
      case "locomotive":
        if (!locomotiveOne.head) {
          locomotiveOne.append(currentCar.data);
        } else if (!locomotiveTwo.head) {
          locomotiveTwo.append(currentCar.data);
        }
        break;
      case "passengerCar":
        switch (currentCar.data.subtype) {
          case "diningCar":
            diningSection.append(currentCar.data);
            break;
          case "seatingCar":
            seatingSection.append(currentCar.data);
            break;
          case "sleepingCar":
            sleepingSection.append(currentCar.data);
            break;
          default:
            throw new Error("Not a valid passenger car type");
        }
        break;
      case "freightCar":
        freightSection.append(currentCar.data);
        break;
      default:
        throw new Error("Not a valid car type");
    }
    currentCar = currentCar.next;
  }

  if (!locomotiveOne.head) {
    locomotiveOne.append(createTrainCar("locomotive"));
  }
  if (carCount > 10 && !locomotiveTwo.head) {
    locomotiveTwo.append(createTrainCar("locomotive"));
  }

  const fixedTrain = createLinkedList();
  fixedTrain.appendList(locomotiveOne);
  if (sleepingSection.head) fixedTrain.appendList(sleepingSection);
  if (diningSection.head) fixedTrain.appendList(diningSection);
  if (seatingSection.head) fixedTrain.appendList(seatingSection);
  if (freightSection.head) fixedTrain.appendList(freightSection);
  if (carCount > 10) fixedTrain.appendList(locomotiveTwo);
  return fixedTrain;
}

export { trainFixer };
