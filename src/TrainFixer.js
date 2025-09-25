import { createLinkedList } from "./LinkedList.js";
import { createTrainCar } from "./Trains.js";

function trainFixer(train) {
  const analysis = analyzeAndCategorize(train);
  return reconstructTrain(analysis);
}

function analyzeAndCategorize(train) {
  const categories = {
    locomotives: [],
    seatingCars: [],
    sleepingCars: [],
    diningCars: [],
    freightCars: [],
  };

  let current = train.head;
  let carCount = 0;

  while (current) {
    carCount++;
    const car = current.data;

    if (car.type === "locomotive") {
      categories.locomotives.push(car);
    } else if (car.type === "passengerCar") {
      if (car.subtype === "seatingCar") {
        categories.seatingCars.push(car);
      } else if (car.subtype === "sleepingCar") {
        categories.sleepingCars.push(car);
      } else if (car.subtype === "diningCar") {
        categories.diningCars.push(car);
      }
    } else if (car.type === "freightCar") {
      categories.freightCars.push(car);
    }

    current = current.next;
  }

  return { categories, carCount };
}

function calculateOptimalPassengerOrder(categories) {
  const { seatingCars, sleepingCars, diningCars } = categories;
  const rearrangedOrder = [];

  if (sleepingCars.length === 0) {
    rearrangedOrder.push(...seatingCars, ...diningCars);
  } else if (diningCars.length === 0) {
    rearrangedOrder.push(...seatingCars, ...sleepingCars);
  } else {
    rearrangedOrder.push(...seatingCars, ...diningCars, ...sleepingCars);
  }
  return rearrangedOrder;
}

function reconstructTrain(analysis) {
  const { categories, carCount } = analysis;
  const fixedTrain = createLinkedList();

  if (categories.locomotives.length === 0) {
    fixedTrain.append(createTrainCar("locomotive"));
  } else {
    fixedTrain.append(categories.locomotives[0]);
  }

  const optimalPassengerOrder = calculateOptimalPassengerOrder(categories);
  optimalPassengerOrder.forEach((car) => fixedTrain.append(car));

  categories.freightCars.forEach((car) => fixedTrain.append(car));

  if (carCount >= 10) {
    if (categories.locomotives.length < 2) {
      fixedTrain.append(createTrainCar("locomotive"));
    } else {
      fixedTrain.append(categories.locomotives[1]);
    }
  }
  return fixedTrain;
}

export { trainFixer };
