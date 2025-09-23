import { createLinkedList } from "./src/LinkedList.js";
import { createTrainCar } from "./src/Trains.js";
import { trainValidator } from "./src/TrainValidator.js";
import { trainFixer } from "./src/TrainFixer.js";

const train = createLinkedList();

train.append(createTrainCar("passengerCar", "seatingCar"));
train.append(createTrainCar("passengerCar", "sleepingCar"));
train.append(createTrainCar("passengerCar", "diningCar"));
train.append(createTrainCar("locomotive"));
train.append(createTrainCar("passengerCar", "sleepingCar"));
train.append(createTrainCar("passengerCar", "sleepingCar"));
train.append(createTrainCar("passengerCar", "sleepingCar"));
train.append(createTrainCar("passengerCar", "sleepingCar"));
train.append(createTrainCar("freightCar"));
train.append(createTrainCar("freightCar"));
train.append(createTrainCar("locomotive"));
train.append(createTrainCar("freightCar"));
train.append(createTrainCar("freightCar"));

console.log(trainValidator(train));
const fixedTrain = trainFixer(train)
console.log(trainValidator(fixedTrain));
// console.log(JSON.stringify(trainFixer(train)));
