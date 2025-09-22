import { createLinkedList } from "./src/LinkedList.js";
import { createTrainCar } from "./src/Trains.js";
import { trainValidator } from "./src/TrainValidator.js";

const train = createLinkedList();
train.append(createTrainCar("locomotive"));
// train.append(createTrainCar("passengerCar", "sleepingCar"));
// train.append(createTrainCar("passengerCar", "sleepingCar"));
train.append(createTrainCar("passengerCar", "seatingCar"));
train.append(createTrainCar("passengerCar", "diningCar"));
// train.append(createTrainCar("locomotive"));
// train.append(createTrainCar("freightCar"));
// train.append(createTrainCar("passengerCar", "sleepingCar"));
// train.append(createTrainCar("passengerCar", "sleepingCar"));
// train.append(createTrainCar("passengerCar", "sleepingCar"));
train.append(createTrainCar("passengerCar", "sleepingCar"));
train.append(createTrainCar("passengerCar", "sleepingCar"));
train.append(createTrainCar("freightCar"));
train.append(createTrainCar("freightCar"));
// train.append(createTrainCar("locomotive"));

console.log(JSON.stringify(trainValidator(train)));
