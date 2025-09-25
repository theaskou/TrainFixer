import { trainValidator } from "../src/TrainValidator.js";
import { trainFixer } from "../src/TrainFixer.js";
import { createLinkedList } from "../src/LinkedList.js";
import { createTrainCar } from "../src/Trains.js";

// Helper function til at lave et tog
function createTrain(carTypes) {
  const train = createLinkedList();
  carTypes.forEach((car) => {
    if (typeof car === "string") {
      train.append(createTrainCar(car));
    } else {
      train.append(createTrainCar(car.type, car.subtype));
    }
  });
  return train;
}

// Helper til at sammenligne to tog
function compareTrains(train1, train2) {
  let current1 = train1.head;
  let current2 = train2.head;

  while (current1 && current2) {
    if (
      current1.data.type !== current2.data.type ||
      current1.data.subtype !== current2.data.subtype
    ) {
      return false;
    }
    current1 = current1.next;
    current2 = current2.next;
  }

  return current1 === null && current2 === null;
}

// Test runner for fixer tests
function runFixerTest(testName, inputTrain, shouldBeValid = true) {
  console.log(`\n--- ${testName} ---`);

  // Test input validity
  const wasValidBefore = trainValidator(inputTrain);
  console.log(`Input valid: ${wasValidBefore}`);

  // Apply fixer
  const fixedTrain = trainFixer(inputTrain);

  // Test output validity
  const isValidAfter = trainValidator(fixedTrain);
  const result = isValidAfter === shouldBeValid ? "✅ PASS" : "❌ FAIL";
  console.log(
    `${result} - Fixed train valid: ${isValidAfter} (expected: ${shouldBeValid})`
  );

  if (isValidAfter !== shouldBeValid) {
    console.log("   ^ This fixer test failed!");
  }

  return { wasValidBefore, isValidAfter, fixedTrain };
}

// Test specific transformations
function runTransformTest(testName, inputTrain, expectedTrain) {
  console.log(`\n--- ${testName} ---`);

  const fixedTrain = trainFixer(inputTrain);
  const isCorrectTransform = compareTrains(fixedTrain, expectedTrain);

  const result = isCorrectTransform ? "✅ PASS" : "❌ FAIL";
  console.log(`${result} - Transformation correct: ${isCorrectTransform}`);

  if (!isCorrectTransform) {
    console.log("   ^ Transformation test failed!");
  }
}

console.log("=== TRAIN FIXER TESTS ===\n");

// ==========================================
// LOKOMOTIV FIXER TESTS
// ==========================================
console.log("=== LOKOMOTIV FIXER TESTS ===");

console.log("\n--- Positive Lokomotiv Fixer Tests ---");

// Test 1: Fjern ekstra lokomotiver i kort tog
runFixerTest(
  "Remove extra locomotive from short train",
  createTrain([
    "locomotive",
    { type: "passengerCar", subtype: "seatingCar" },
    "locomotive", // Skal fjernes
    { type: "passengerCar", subtype: "seatingCar" },
    "freightCar",
  ])
);

// Test 2: Tilføj manglende bagerste lokomotiv til langt tog
runFixerTest(
  "Add missing tail locomotive to long train",
  createTrain([
    "locomotive",
    { type: "passengerCar", subtype: "seatingCar" },
    { type: "passengerCar", subtype: "seatingCar" },
    { type: "passengerCar", subtype: "seatingCar" },
    { type: "passengerCar", subtype: "seatingCar" },
    { type: "passengerCar", subtype: "seatingCar" },
    { type: "passengerCar", subtype: "seatingCar" },
    "freightCar",
    "freightCar",
    "freightCar",
    "freightCar",
    "freightCar", // Mangler lokomotiv bagerst
  ])
);

// Test 3: Flyt lokomotiv fra midt til bagerst (langt tog)
runFixerTest(
  "Move locomotive from middle to tail (long train)",
  createTrain([
    "locomotive",
    { type: "passengerCar", subtype: "seatingCar" },
    { type: "passengerCar", subtype: "seatingCar" },
    "locomotive", // I midten - skal flyttes til bagerst
    { type: "passengerCar", subtype: "seatingCar" },
    { type: "passengerCar", subtype: "seatingCar" },
    { type: "passengerCar", subtype: "seatingCar" },
    "freightCar",
    "freightCar",
    "freightCar",
    "freightCar",
    "freightCar",
  ])
);

// Test 4: Tilføj manglende head lokomotiv
runFixerTest(
  "Add missing head locomotive",
  createTrain([
    { type: "passengerCar", subtype: "seatingCar" }, // Mangler lokomotiv forrest
    { type: "passengerCar", subtype: "seatingCar" },
    "freightCar",
    "freightCar",
  ])
);

// ==========================================
// PASSAGER/GODS RÆKKEFØLGE FIXER TESTS
// ==========================================
console.log("\n=== PASSAGER/GODS RÆKKEFØLGE FIXER TESTS ===");

console.log("\n--- Positive Passager/Gods Fixer Tests ---");

// Test 5: Flyt passagervogne foran godsvogne
runFixerTest(
  "Move passengers before freight",
  createTrain([
    "locomotive",
    "freightCar", // Forkert placering
    { type: "passengerCar", subtype: "seatingCar" }, // Skal flyttes frem
    "freightCar",
    { type: "passengerCar", subtype: "diningCar" }, // Skal flyttes frem
  ])
);

// Test 6: Sorter kompleks blandet rækkefølge
runFixerTest(
  "Sort complex mixed passenger/freight order",
  createTrain([
    "locomotive",
    "freightCar",
    { type: "passengerCar", subtype: "seatingCar" },
    "freightCar",
    { type: "passengerCar", subtype: "sleepingCar" },
    "freightCar",
    { type: "passengerCar", subtype: "diningCar" },
    "freightCar",
  ])
);

// ==========================================
// SENGEVOGNS FIXER TESTS
// ==========================================
console.log("\n=== SENGEVOGNS FIXER TESTS ===");

console.log("\n--- Positive Sengevogns Fixer Tests ---");

// Test 7: Samle adskilte sengevogne
runFixerTest(
  "Group separated sleeping cars",
  createTrain([
    "locomotive",
    { type: "passengerCar", subtype: "sleepingCar" },
    { type: "passengerCar", subtype: "seatingCar" }, // Adskiller sengevogne
    { type: "passengerCar", subtype: "sleepingCar" },
    "freightCar",
  ])
);

// Test 8: Samle tre adskilte sengevogne
runFixerTest(
  "Group three separated sleeping cars",
  createTrain([
    "locomotive",
    { type: "passengerCar", subtype: "sleepingCar" },
    { type: "passengerCar", subtype: "seatingCar" },
    { type: "passengerCar", subtype: "sleepingCar" },
    { type: "passengerCar", subtype: "diningCar" },
    { type: "passengerCar", subtype: "sleepingCar" },
    "freightCar",
  ])
);

// Test 9: Kompleks sengevogns-gruppering
runFixerTest(
  "Complex sleeping car grouping with multiple sections",
  createTrain([
    "locomotive",
    { type: "passengerCar", subtype: "seatingCar" },
    { type: "passengerCar", subtype: "sleepingCar" },
    { type: "passengerCar", subtype: "sleepingCar" },
    { type: "passengerCar", subtype: "diningCar" },
    { type: "passengerCar", subtype: "seatingCar" },
    { type: "passengerCar", subtype: "sleepingCar" }, // Adskilt gruppe
    { type: "passengerCar", subtype: "sleepingCar" },
    "freightCar",
  ])
);

// ==========================================
// SPISEVOGNS FIXER TESTS
// ==========================================
console.log("\n=== SPISEVOGNS FIXER TESTS ===");

console.log("\n--- Positive Spisevogns Fixer Tests ---");

// Test 10: Flyt spisevogn så den ikke er blokeret
runFixerTest(
  "Move dining car to avoid sleeping car blockage",
  createTrain([
    "locomotive",
    { type: "passengerCar", subtype: "seatingCar" },
    { type: "passengerCar", subtype: "sleepingCar" },
    { type: "passengerCar", subtype: "diningCar" }, // Blokeret af sengevogn
    "freightCar",
  ])
);

// Test 11: Tilføj manglende spisevogn til langt tog
runFixerTest(
  "Add missing dining car to long train",
  createTrain([
    "locomotive",
    { type: "passengerCar", subtype: "seatingCar" },
    { type: "passengerCar", subtype: "seatingCar" },
    { type: "passengerCar", subtype: "seatingCar" }, // Siddevogne uden spisevogn
    { type: "passengerCar", subtype: "seatingCar" },
    { type: "passengerCar", subtype: "sleepingCar" },
    { type: "passengerCar", subtype: "sleepingCar" },
    "freightCar",
    "freightCar",
    "freightCar",
    "freightCar",
    "locomotive",
  ])
);

// Test 12: Kompleks spisevogn optimering
runFixerTest(
  "Complex dining car optimization with accessibility",
  createTrain([
    "locomotive",
    { type: "passengerCar", subtype: "seatingCar" },
    { type: "passengerCar", subtype: "seatingCar" },
    { type: "passengerCar", subtype: "sleepingCar" },
    { type: "passengerCar", subtype: "sleepingCar" },
    { type: "passengerCar", subtype: "diningCar" }, // Bag sengevogne - utilgængelig
    { type: "passengerCar", subtype: "seatingCar" }, // Kan ikke nå spisevogn
    "freightCar",
  ])
);

// ==========================================
// KOMBINEREDE/KOMPLEKSE FIXER TESTS
// ==========================================
console.log("\n=== KOMBINEREDE/KOMPLEKSE FIXER TESTS ===");

console.log("\n--- Positive Kombinerede Fixer Tests ---");

// Test 13: Fix alle regler samtidigt (kort tog)
runFixerTest(
  "Fix all rules simultaneously (short train)",
  createTrain([
    "freightCar", // Forkert rækkefølge
    { type: "passengerCar", subtype: "sleepingCar" },
    { type: "passengerCar", subtype: "seatingCar" }, // Adskiller sengevogne
    "locomotive", // Forkert placering
    { type: "passengerCar", subtype: "sleepingCar" },
    "freightCar",
    // Mangler head lokomotiv
  ])
);

// Test 14: Fix alle regler samtidigt (langt tog)
runFixerTest(
  "Fix all rules simultaneously (long train)",
  createTrain([
    { type: "passengerCar", subtype: "seatingCar" }, // Mangler head lokomotiv
    "freightCar", // Forkert rækkefølge
    { type: "passengerCar", subtype: "sleepingCar" },
    { type: "passengerCar", subtype: "diningCar" }, // Dårlig placering
    { type: "passengerCar", subtype: "seatingCar" },
    "locomotive", // Forkert placering
    { type: "passengerCar", subtype: "sleepingCar" }, // Adskilt sengevogn
    "freightCar",
    "freightCar",
    "freightCar",
    "freightCar",
    // Mangler tail lokomotiv
  ])
);

// Test 15: Maksimal kompleksitet
runFixerTest(
  "Maximum complexity - all violations",
  createTrain([
    "freightCar",
    { type: "passengerCar", subtype: "sleepingCar" },
    "locomotive", // Midt i
    { type: "passengerCar", subtype: "diningCar" },
    "freightCar",
    { type: "passengerCar", subtype: "seatingCar" },
    { type: "passengerCar", subtype: "sleepingCar" }, // Adskilt
    "freightCar",
    { type: "passengerCar", subtype: "seatingCar" }, // Efter gods
    { type: "passengerCar", subtype: "sleepingCar" }, // Endnu en adskilt
    "freightCar",
    "freightCar",
    // Mangler begge lokomotiver i korrekte positioner
  ])
);

// ==========================================
// EDGE CASE FIXER TESTS
// ==========================================
console.log("\n=== EDGE CASE FIXER TESTS ===");

console.log("\n--- Positive Edge Case Fixer Tests ---");

// Test 16: Tom tog (edge case)
runFixerTest(
  "Fix empty train",
  createLinkedList(), // Tom liste
  false // Forbliver ugyldig
);

// Test 17: Kun lokomotiver
runFixerTest(
  "Train with only locomotives",
  createTrain(["locomotive", "locomotive", "locomotive"])
);

// Test 18: Kun godsvogne (mangler lokomotiv)
runFixerTest(
  "Train with only freight cars",
  createTrain(["freightCar", "freightCar", "freightCar"])
);

// Test 19: Kun passagervogne (mangler lokomotiv)
runFixerTest(
  "Train with only passenger cars",
  createTrain([
    { type: "passengerCar", subtype: "seatingCar" },
    { type: "passengerCar", subtype: "diningCar" },
    { type: "passengerCar", subtype: "sleepingCar" },
  ])
);

// ==========================================
// PERFORMANCE/STRESS TESTS
// ==========================================
console.log("\n=== PERFORMANCE/STRESS TESTS ===");

// Test 20: Stort tog med mange fejl
runFixerTest(
  "Large train with many violations",
  createTrain([
    "freightCar",
    "freightCar", // Gods først
    { type: "passengerCar", subtype: "sleepingCar" },
    { type: "passengerCar", subtype: "seatingCar" },
    { type: "passengerCar", subtype: "sleepingCar" }, // Adskilt
    "locomotive", // Midt i
    { type: "passengerCar", subtype: "diningCar" },
    "freightCar",
    { type: "passengerCar", subtype: "seatingCar" },
    { type: "passengerCar", subtype: "sleepingCar" }, // Endnu en adskilt
    "freightCar",
    "freightCar",
    "freightCar",
    { type: "passengerCar", subtype: "seatingCar" }, // Efter gods igen
    "freightCar",
    "freightCar",
    "freightCar",
    "freightCar",
    "freightCar",
    "freightCar",
    // Massivt rod der skal ryddes op i
  ])
);

// ==========================================
// SPECIFIK TRANSFORMATION TESTS
// ==========================================
console.log("\n=== SPECIFIK TRANSFORMATION TESTS ===");

// Test 21: Specifik transformation - simpel ombytning
runTransformTest(
  "Specific transformation - simple swap",
  createTrain([
    "locomotive",
    "freightCar", // Skal flyttes
    { type: "passengerCar", subtype: "seatingCar" }, // Skal flyttes frem
  ]),
  createTrain([
    "locomotive",
    { type: "passengerCar", subtype: "seatingCar" }, // Flyttet frem
    "freightCar", // Flyttet bag
  ])
);

// Test 22: Specifik transformation - sengevogns-gruppering
runTransformTest(
  "Specific transformation - sleeping car grouping",
  createTrain([
    "locomotive",
    { type: "passengerCar", subtype: "sleepingCar" },
    { type: "passengerCar", subtype: "seatingCar" },
    { type: "passengerCar", subtype: "sleepingCar" },
  ]),
  createTrain([
    "locomotive",
    { type: "passengerCar", subtype: "seatingCar" }, // Flyttet væk
    { type: "passengerCar", subtype: "sleepingCar" }, // Grupperet
    { type: "passengerCar", subtype: "sleepingCar" }, // Grupperet
  ])
);

console.log("\n=== ALLE FIXER TESTS COMPLETED ===");
