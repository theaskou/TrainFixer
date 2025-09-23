import { trainValidator } from "../src/TrainValidator.js";
import { createLinkedList } from "../src/LinkedList.js";
import { createTrainCar } from "../src/Trains.js";

// Helper function til at lave et tog
function createTrain(carTypes) {
  const train = createLinkedList();
  carTypes.forEach((car) => {
    if (typeof car === "string") {
      // Simple car types
      train.append(createTrainCar(car));
    } else {
      // Car with subtype
      train.append(createTrainCar(car.type, car.subtype));
    }
  });
  return train;
}

// Test runner
function runTest(testName, expected, actual) {
  const result = expected === actual ? "✅ PASS" : "❌ FAIL";
  console.log(`${result} - ${testName}: Expected ${expected}, got ${actual}`);
  if (expected !== actual) {
    console.log("   ^ This test failed!");
  }
}

console.log("=== TRAIN VALIDATOR TESTS ===\n");

// ==========================================
// LOKOMOTIV TESTS
// ==========================================
console.log("--- LOKOMOTIV TESTS ---");

// Positive tests - Lokomotivet placeret korrekt
console.log("\nPositive Lokomotiv Tests:");

// Test 1: Kort tog (≤10 vogne) med lokomotiv kun forrest
runTest(
  "Short train (5 cars) - locomotive only at head",
  true,
  trainValidator(
    createTrain([
      "locomotive",
      { type: "passengerCar", subtype: "seatingCar" },
      { type: "passengerCar", subtype: "seatingCar" },
      { type: "passengerCar", subtype: "seatingCar" },
      "freightCar",
    ])
  )
);

// Test 2: Langt tog (>10 vogne) med lokomotiv forrest og bagerst
runTest(
  "Long train (12 cars) - locomotives at head and tail",
  true,
  trainValidator(
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
      "locomotive",
    ])
  )
);

// Negative tests - Lokomotiv forkert placeret
console.log("\nNegative Lokomotiv Tests:");

// Test 3: Intet lokomotiv forrest
runTest(
  "No locomotive at head",
  false,
  trainValidator(
    createTrain([{ type: "passengerCar", subtype: "seatingCar" }, "freightCar"])
  )
);

// Test 4: Kort tog med lokomotiv midt i
runTest(
  "Short train - locomotive in middle",
  false,
  trainValidator(
    createTrain([
      "locomotive",
      { type: "passengerCar", subtype: "seatingCar" },
      "locomotive",
      "freightCar",
    ])
  )
);

// Test 5: Kort tog med lokomotiv bagerst
runTest(
  "Short train - locomotive at tail (should be invalid)",
  false,
  trainValidator(
    createTrain([
      "locomotive",
      { type: "passengerCar", subtype: "seatingCar" },
      { type: "passengerCar", subtype: "seatingCar" },
      "locomotive",
    ])
  )
);

// Test 6: Langt tog uden lokomotiv bagerst
runTest(
  "Long train - no locomotive at tail",
  false,
  trainValidator(
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
      "freightCar",
    ])
  )
);

// Test 7: Langt tog med lokomotiv midt i
runTest(
  "Long train - locomotive in middle",
  false,
  trainValidator(
    createTrain([
      "locomotive",
      { type: "passengerCar", subtype: "seatingCar" },
      { type: "passengerCar", subtype: "seatingCar" },
      "locomotive", // Midt i toget
      { type: "passengerCar", subtype: "seatingCar" },
      { type: "passengerCar", subtype: "seatingCar" },
      { type: "passengerCar", subtype: "seatingCar" },
      "freightCar",
      "freightCar",
      "freightCar",
      "freightCar",
      "freightCar",
      "freightCar",
      "locomotive",
    ])
  )
);

// ==========================================
// PASSAGER/GODS RÆKKEFØLGE TESTS
// ==========================================
console.log("\n--- PASSAGER/GODS RÆKKEFØLGE TESTS ---");

console.log("\nPositive Passager/Gods Tests:");

// Test 8: Kun passagervogne
runTest(
  "Only passenger cars",
  true,
  trainValidator(
    createTrain([
      "locomotive",
      { type: "passengerCar", subtype: "seatingCar" },
      { type: "passengerCar", subtype: "seatingCar" },
    ])
  )
);

// Test 9: Kun godsvogne
runTest(
  "Only freight cars",
  true,
  trainValidator(createTrain(["locomotive", "freightCar", "freightCar"]))
);

// Test 10: Passager før gods
runTest(
  "Passengers before freight",
  true,
  trainValidator(
    createTrain([
      "locomotive",
      { type: "passengerCar", subtype: "seatingCar" },
      { type: "passengerCar", subtype: "diningCar" },
      "freightCar",
      "freightCar",
    ])
  )
);

console.log("\nNegative Passager/Gods Tests:");

// Test 11: Gods før passager
runTest(
  "Freight before passengers",
  false,
  trainValidator(
    createTrain([
      "locomotive",
      "freightCar",
      { type: "passengerCar", subtype: "seatingCar" },
    ])
  )
);

// Test 12: Blandet rækkefølge
runTest(
  "Mixed passenger/freight order",
  false,
  trainValidator(
    createTrain([
      "locomotive",
      { type: "passengerCar", subtype: "seatingCar" },
      "freightCar",
      { type: "passengerCar", subtype: "seatingCar" },
      "freightCar",
    ])
  )
);

// ==========================================
// SENGEVOGNS TESTS
// ==========================================
console.log("\n--- SENGEVOGNS TESTS ---");

console.log("\nPositive Sengevogns Tests:");

// Test 13: Ingen sengevogne
runTest(
  "No sleeping cars",
  true,
  trainValidator(
    createTrain([
      "locomotive",
      { type: "passengerCar", subtype: "seatingCar" },
      { type: "passengerCar", subtype: "diningCar" },
      "freightCar",
    ])
  )
);

// Test 14: Én sengevogn
runTest(
  "One sleeping car",
  true,
  trainValidator(
    createTrain([
      "locomotive",
      { type: "passengerCar", subtype: "seatingCar" },
      { type: "passengerCar", subtype: "sleepingCar" },
      "freightCar",
    ])
  )
);

// Test 15: To sammenhængende sengevogne
runTest(
  "Two adjacent sleeping cars",
  true,
  trainValidator(
    createTrain([
      "locomotive",
      { type: "passengerCar", subtype: "seatingCar" },
      { type: "passengerCar", subtype: "sleepingCar" },
      { type: "passengerCar", subtype: "sleepingCar" },
      "freightCar",
    ])
  )
);

// Test 16: Tre sammenhængende sengevogne
runTest(
  "Three adjacent sleeping cars",
  true,
  trainValidator(
    createTrain([
      "locomotive",
      { type: "passengerCar", subtype: "sleepingCar" },
      { type: "passengerCar", subtype: "sleepingCar" },
      { type: "passengerCar", subtype: "sleepingCar" },
      "freightCar",
    ])
  )
);

console.log("\nNegative Sengevogns Tests:");

// Test 17: To adskilte sengevogne
runTest(
  "Two separated sleeping cars",
  false,
  trainValidator(
    createTrain([
      "locomotive",
      { type: "passengerCar", subtype: "sleepingCar" },
      { type: "passengerCar", subtype: "seatingCar" },
      { type: "passengerCar", subtype: "sleepingCar" },
      "freightCar",
    ])
  )
);

// Test 18: Tre sengevogne, to sammen og en separat
runTest(
  "Three sleeping cars - two adjacent, one separate",
  false,
  trainValidator(
    createTrain([
      "locomotive",
      { type: "passengerCar", subtype: "sleepingCar" },
      { type: "passengerCar", subtype: "sleepingCar" },
      { type: "passengerCar", subtype: "seatingCar" },
      { type: "passengerCar", subtype: "sleepingCar" },
      "freightCar",
    ])
  )
);

// ==========================================
// SPISEVOGNS TESTS
// ==========================================
console.log("\n--- SPISEVOGNS TESTS ---");

console.log("\nPositive Spisevogns Tests:");

// Test 19: Ingen spisevogn
runTest(
  "No dining car",
  true,
  trainValidator(
    createTrain([
      "locomotive",
      { type: "passengerCar", subtype: "seatingCar" },
      "freightCar",
    ])
  )
);

// Test 20: Spisevogn tilgængelig fra siddevogn
runTest(
  "Dining car accessible from sitting car",
  true,
  trainValidator(
    createTrain([
      "locomotive",
      { type: "passengerCar", subtype: "seatingCar" },
      { type: "passengerCar", subtype: "diningCar" },
      "freightCar",
    ])
  )
);

// Test 21: Spisevogn ved siden af siddevogn
runTest(
  "Dining car next to sitting car",
  true,
  trainValidator(
    createTrain([
      "locomotive",
      { type: "passengerCar", subtype: "diningCar" },
      { type: "passengerCar", subtype: "seatingCar" },
      "freightCar",
    ])
  )
);

console.log("\nNegative Spisevogns Tests:");

// Test 22: Spisevogn blokeret af sengevogn
runTest(
  "Dining car blocked by sleeping car",
  false,
  trainValidator(
    createTrain([
      "locomotive",
      { type: "passengerCar", subtype: "seatingCar" },
      { type: "passengerCar", subtype: "sleepingCar" },
      { type: "passengerCar", subtype: "diningCar" },
      "freightCar",
    ])
  )
);

// Test 23: To siddevogne adskilt af sengevogn fra spisevogn
runTest(
  "Sitting cars separated from dining car by sleeping car",
  false,
  trainValidator(
    createTrain([
      "locomotive",
      { type: "passengerCar", subtype: "seatingCar" },
      { type: "passengerCar", subtype: "seatingCar" },
      { type: "passengerCar", subtype: "sleepingCar" },
      { type: "passengerCar", subtype: "sleepingCar" },
      { type: "passengerCar", subtype: "diningCar" },
      "freightCar",
    ])
  )
);

// ==========================================
// KOMPLEKSE INTEGRATION TESTS
// ==========================================
console.log("\n--- KOMPLEKSE INTEGRATION TESTS ---");

// Test 24: Perfekt langt tog
runTest(
  "Perfect long train",
  true,
  trainValidator(
    createTrain([
      "locomotive",
      { type: "passengerCar", subtype: "seatingCar" },
      { type: "passengerCar", subtype: "diningCar" },
      { type: "passengerCar", subtype: "seatingCar" },
      { type: "passengerCar", subtype: "sleepingCar" },
      { type: "passengerCar", subtype: "sleepingCar" },
      "freightCar",
      "freightCar",
      "freightCar",
      "freightCar",
      "freightCar",
      "locomotive",
    ])
  )
);

// Test 25: Multiple regel-brud
runTest(
  "Multiple rule violations",
  false,
  trainValidator(
    createTrain([
      "locomotive",
      "freightCar", // Gods før passager
      { type: "passengerCar", subtype: "sleepingCar" },
      { type: "passengerCar", subtype: "seatingCar" },
      { type: "passengerCar", subtype: "sleepingCar" }, // Adskilt sengevogn
      "locomotive", // Lokomotiv midt i
      "freightCar",
    ])
  )
);

// ==========================================
// EDGE CASES
// ==========================================
console.log("\n--- EDGE CASES ---");

// Test 26: Tomt tog
runTest("Empty train", false, trainValidator(createLinkedList()));

// Test 27: Null train
runTest("Null train", false, trainValidator(null));

// Test 28: Kun lokomotiv
runTest("Only locomotive", true, trainValidator(createTrain(["locomotive"])));

// Test 29: Præcis 10 vogne
runTest(
  "Exactly 10 cars",
  true,
  trainValidator(
    createTrain([
      "locomotive",
      { type: "passengerCar", subtype: "seatingCar" },
      { type: "passengerCar", subtype: "seatingCar" },
      { type: "passengerCar", subtype: "seatingCar" },
      { type: "passengerCar", subtype: "seatingCar" },
      { type: "passengerCar", subtype: "seatingCar" },
      "freightCar",
      "freightCar",
      "freightCar",
      "freightCar",
    ])
  )
);

// Test 30: Præcis 11 vogne (grænse for lange tog)
runTest(
  "Exactly 11 cars",
  true,
  trainValidator(
    createTrain([
      "locomotive",
      { type: "passengerCar", subtype: "seatingCar" },
      { type: "passengerCar", subtype: "seatingCar" },
      { type: "passengerCar", subtype: "seatingCar" },
      { type: "passengerCar", subtype: "seatingCar" },
      { type: "passengerCar", subtype: "seatingCar" },
      "freightCar",
      "freightCar",
      "freightCar",
      "freightCar",
      "locomotive",
    ])
  )
);

// ==========================================
// EKSTRA BLANDEDE LANGE TOG TESTS
// ==========================================
console.log("\n--- EKSTRA BLANDEDE LANGE TOG TESTS ---");

console.log("\nPositive Blandede Lange Tog Tests:");

// Test 31: Langt tog med alle vogntyper i korrekt rækkefølge
runTest(
  "Long train with all car types in correct order",
  true,
  trainValidator(
    createTrain([
      "locomotive",
      { type: "passengerCar", subtype: "seatingCar" },
      { type: "passengerCar", subtype: "seatingCar" },
      { type: "passengerCar", subtype: "diningCar" },
      { type: "passengerCar", subtype: "seatingCar" },
      { type: "passengerCar", subtype: "sleepingCar" },
      { type: "passengerCar", subtype: "sleepingCar" },
      { type: "passengerCar", subtype: "sleepingCar" },
      "freightCar",
      "freightCar",
      "freightCar",
      "freightCar",
      "freightCar",
      "freightCar",
      "locomotive",
    ])
  )
);

// Test 32: Langt tog med spisevogn i midten af siddevogne
runTest(
  "Long train with dining car in middle of sitting cars",
  true,
  trainValidator(
    createTrain([
      "locomotive",
      { type: "passengerCar", subtype: "seatingCar" },
      { type: "passengerCar", subtype: "seatingCar" },
      { type: "passengerCar", subtype: "seatingCar" },
      { type: "passengerCar", subtype: "diningCar" },
      { type: "passengerCar", subtype: "seatingCar" },
      { type: "passengerCar", subtype: "seatingCar" },
      "freightCar",
      "freightCar",
      "freightCar",
      "freightCar",
      "freightCar",
      "locomotive",
    ])
  )
);

// Test 33: Langt tog med sengevogne i slutningen af passagersektion
runTest(
  "Long train with sleeping cars at end of passenger section",
  true,
  trainValidator(
    createTrain([
      "locomotive",
      { type: "passengerCar", subtype: "seatingCar" },
      { type: "passengerCar", subtype: "diningCar" },
      { type: "passengerCar", subtype: "seatingCar" },
      { type: "passengerCar", subtype: "seatingCar" },
      { type: "passengerCar", subtype: "sleepingCar" },
      { type: "passengerCar", subtype: "sleepingCar" },
      "freightCar",
      "freightCar",
      "freightCar",
      "freightCar",
      "freightCar",
      "locomotive",
    ])
  )
);

// Test 34: Langt tog med mange forskellige passagervogne før sengevogne
runTest(
  "Long train with many passenger types before sleeping cars",
  true,
  trainValidator(
    createTrain([
      "locomotive",
      { type: "passengerCar", subtype: "seatingCar" },
      { type: "passengerCar", subtype: "diningCar" },
      { type: "passengerCar", subtype: "seatingCar" },
      { type: "passengerCar", subtype: "diningCar" },
      { type: "passengerCar", subtype: "seatingCar" },
      { type: "passengerCar", subtype: "sleepingCar" },
      { type: "passengerCar", subtype: "sleepingCar" },
      { type: "passengerCar", subtype: "sleepingCar" },
      "freightCar",
      "freightCar",
      "freightCar",
      "locomotive",
    ])
  )
);

// Test 35: Langt tog med kun siddevogne og godsvogne
runTest(
  "Long train with only sitting cars and freight cars",
  true,
  trainValidator(
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
      "freightCar",
      "locomotive",
    ])
  )
);

console.log("\nNegative Blandede Lange Tog Tests:");

// Test 36: Langt tog med sengevogne efter spisevogn (blokerer adgang)
runTest(
  "Long train - sleeping cars after dining car (blocking access)",
  false,
  trainValidator(
    createTrain([
      "locomotive",
      { type: "passengerCar", subtype: "seatingCar" },
      { type: "passengerCar", subtype: "seatingCar" },
      { type: "passengerCar", subtype: "diningCar" },
      { type: "passengerCar", subtype: "sleepingCar" },
      { type: "passengerCar", subtype: "sleepingCar" },
      { type: "passengerCar", subtype: "seatingCar" }, // Kan ikke nå spisevogn
      "freightCar",
      "freightCar",
      "freightCar",
      "freightCar",
      "freightCar",
      "locomotive",
    ])
  )
);

// Test 37: Langt tog med passagervogne efter gods (forkert rækkefølge)
runTest(
  "Long train - passengers after freight (wrong order)",
  false,
  trainValidator(
    createTrain([
      "locomotive",
      { type: "passengerCar", subtype: "seatingCar" },
      { type: "passengerCar", subtype: "seatingCar" },
      "freightCar",
      "freightCar",
      { type: "passengerCar", subtype: "seatingCar" }, // Passager efter gods
      "freightCar",
      "freightCar",
      "freightCar",
      "freightCar",
      "freightCar",
      "locomotive",
    ])
  )
);

// Test 38: Langt tog med adskilte sengevogne og spisevogn mellem
runTest(
  "Long train - separated sleeping cars with dining car between",
  false,
  trainValidator(
    createTrain([
      "locomotive",
      { type: "passengerCar", subtype: "seatingCar" },
      { type: "passengerCar", subtype: "sleepingCar" },
      { type: "passengerCar", subtype: "sleepingCar" },
      { type: "passengerCar", subtype: "diningCar" },
      { type: "passengerCar", subtype: "sleepingCar" }, // Adskilt sengevogn
      { type: "passengerCar", subtype: "seatingCar" },
      "freightCar",
      "freightCar",
      "freightCar",
      "freightCar",
      "locomotive",
    ])
  )
);

// Test 39: Langt tog med tre lokomotiver (for mange)
runTest(
  "Long train - three locomotives (too many)",
  false,
  trainValidator(
    createTrain([
      "locomotive",
      { type: "passengerCar", subtype: "seatingCar" },
      { type: "passengerCar", subtype: "seatingCar" },
      "locomotive", // Ekstra lokomotiv midt i
      { type: "passengerCar", subtype: "seatingCar" },
      { type: "passengerCar", subtype: "seatingCar" },
      "freightCar",
      "freightCar",
      "freightCar",
      "freightCar",
      "freightCar",
      "locomotive",
    ])
  )
);

// Test 40: Langt tog med kompleks sengevogn-fejl
runTest(
  "Long train - complex sleeping car violation",
  false,
  trainValidator(
    createTrain([
      "locomotive",
      { type: "passengerCar", subtype: "seatingCar" },
      { type: "passengerCar", subtype: "sleepingCar" },
      { type: "passengerCar", subtype: "sleepingCar" },
      { type: "passengerCar", subtype: "diningCar" },
      { type: "passengerCar", subtype: "seatingCar" },
      { type: "passengerCar", subtype: "sleepingCar" }, // Ny sengevogns-gruppe
      { type: "passengerCar", subtype: "sleepingCar" },
      "freightCar",
      "freightCar",
      "freightCar",
      "locomotive",
    ])
  )
);

// Test 41: Langt tog med spisevogn bagerst (tilgængelighed problem)
runTest(
  "Long train - dining car at back (accessibility issue)",
  false,
  trainValidator(
    createTrain([
      "locomotive",
      { type: "passengerCar", subtype: "seatingCar" },
      { type: "passengerCar", subtype: "seatingCar" },
      { type: "passengerCar", subtype: "sleepingCar" },
      { type: "passengerCar", subtype: "sleepingCar" },
      { type: "passengerCar", subtype: "sleepingCar" },
      { type: "passengerCar", subtype: "diningCar" }, // Blokeret af sengevogne
      "freightCar",
      "freightCar",
      "freightCar",
      "freightCar",
      "locomotive",
    ])
  )
);

// Test 42: Langt tog - multiple regel-brud samtidigt
runTest(
  "Long train - multiple simultaneous violations",
  false,
  trainValidator(
    createTrain([
      "locomotive",
      "freightCar", // Gods før passager
      { type: "passengerCar", subtype: "sleepingCar" },
      { type: "passengerCar", subtype: "seatingCar" },
      { type: "passengerCar", subtype: "sleepingCar" }, // Adskilt sengevogn
      { type: "passengerCar", subtype: "diningCar" }, // Spisevogn blokeret
      { type: "passengerCar", subtype: "seatingCar" }, // Passager efter gods
      "freightCar",
      "freightCar",
      "freightCar",
      "freightCar",
      // Mangler bagerste lokomotiv
    ])
  )
);

console.log("\n=== TESTS COMPLETED ===");
