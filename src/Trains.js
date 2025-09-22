function createTrainCar(type, subtype) {
  const VALID_TYPES = ["locomotive", "passengerCar", "freightCar"];
  const VALID_SUBTYPES = {
    passengerCar: ["seatingCar", "sleepingCar", "diningCar"],
    locomotive: [],
    freightCar: [],
  };

  if (!type) {
    throw new Error(`Train car must have a type: ${VALID_TYPES.join(", ")}`);
  }

  if (!VALID_TYPES.includes(type)) {
    throw new Error(
      `Invalid type: ${type}. Must be one of: ${VALID_TYPES.join(", ")}`
    );
  }

  if (subtype) {
    if (!VALID_SUBTYPES[type].includes(subtype)) {
      throw new Error(
        `Invalid subtype: ${subtype} for type: ${type}. Valid subtypes: ${VALID_SUBTYPES[
          type
        ].join(", ")}`
      );
    }
  }

  if (type === "passengerCar" && !subtype) {
    throw new Error("Passenger cars must have a subtype");
  }
  return { type, subtype: subtype ? subtype : null };
}

export { createTrainCar };
