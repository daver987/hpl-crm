//create a function that returns the fare calculation based on distance of the fare.
// The function requites a fareDistanceCost object that has the following properties:
// minimumFare: number, minimumDistance: number, costPerKm: number.
// The function takes in a distance checks if the distance is greater than the minimum distance, if its is false then
// it returns the minimum fare. If the distance is greater than the minimum distance then it subtracts the minimum
// distance from the distance and multiplies the result by the cost per km plus the minimum fare.

export interface FareDistanceParameters {
  minimumFare: number
  minimumDistance: number
  costPerKm: number
}

const baseFareCalculation = (
  fareDistanceCost: FareDistanceParameters,
  distance: number
): number => {
  const { minimumFare, minimumDistance, costPerKm } = fareDistanceCost
  if (distance < minimumDistance) {
    return minimumFare
  }
  return (distance - minimumDistance) * costPerKm + minimumFare
}

//write a function that calculates the gratuity based on the fare and the gratuity rate.
// The function takes in a fare and gratuity rate which is between 0 and 100 and returns the gratuity.

const gratuityCalculation = (fare: number, gratuityRate: number): number => {
  // add a check to make sure that the gratuity rate is between 0 and 100.
  // if the gratuity rate is outside this range throw and error.
  if (gratuityRate < 0 || gratuityRate > 100) {
    throw new Error('Gratuity rate must be between 0 and 100')
  }
  return (fare * gratuityRate) / 100
}

//write a function that calculates the tax based on the fare and the tax rate.
// The function takes in a fare and tax rate and returns the tax rate as a number between 0 and 1.

const taxCalculation = (fare: number, taxRate: number): number => {
  // add a check to make sure that the tax rate is between 0 and 100.
  // if the tax rate is outside this range throw an error.
  if (taxRate < 0 || taxRate > 100) {
    throw new Error('Tax rate must be between 0 and 100')
  }
  // return the tax rate as a number between 0 and 1.
  return (fare * taxRate) / 100
}

// create a helper function that formats the total fare to 2 decimal places and rounds it up to the nearest cent.
const formatTotalFare = (totalFare: number): number => {
  return Math.ceil(totalFare * 100) / 100
}

// create a function that converts a number between 0 and 100 into a float that represents a percentage.

const formatPercentage = (percentageAmount: number): number => {
  // add a check to make sure that the percentage amount is between 0 and 100.
  // if the percentage amount is outside this range throw an error.
  if (percentageAmount < 0 || percentageAmount > 100) {
    throw new Error('Percentage amount must be between 0 and 100')
  }
  return percentageAmount / 100
}

// create a function that determines if the discount is a percentage or a flat rate.

const isPercentage = (percentageAmount: number): boolean => {
  return percentageAmount < 1
}

//Create a function that calculates a discount based on the total fare and the discount rate.
// the discount rate can either be a percentage or a flat rate.
// The function takes in a total fare and discount rate and returns the discount.

const discountCalculation = (
  totalFare: number,
  discountRate: number
): number => {
  return totalFare - discountRate
}

// create a function that calculates the final fare based on the different parameters passed in.

const totalDistanceFareCalculation = (
  fareRate: FareDistanceParameters,
  distance: number,
  gratuityRate: number,
  taxRate: number
): number => {
  const baseFare = baseFareCalculation(fareRate, distance)
  const gratuity = gratuityCalculation(baseFare, gratuityRate)
  const tax = taxCalculation(baseFare, taxRate)
  return formatTotalFare(baseFare + gratuity + tax)
}

export default {
  formatPercentage,
  baseFareCalculation,
  gratuityCalculation,
  taxCalculation,
  formatTotalFare,
  discountCalculation,
  isPercentage,
  totalDistanceFareCalculation,
}
