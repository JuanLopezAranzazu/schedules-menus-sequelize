function validateInputArray(inputArray) {
  const correctType = inputArray.every((item) => {
    return typeof item === "number" && item >= 0 && item <= 6;
  });
  const correctItems = inputArray.length === new Set(inputArray).size;
  return correctType && correctItems;
}

module.exports = { validateInputArray };
