//create a helper function that will calculate a fare based on the distance and the type of vehicle, and return the
// cost of the base fare, hst, gratuity and total cost. There are 4 types of vehicles, each with a different cost per km.
// The cost of the ride should be calculated as follows: Luxury sedan @ 1.7 per km, Premium Luxury sedan @ 1.9 per
// km, Luxury SUV @ 2.75 per km, Premium Luxury SUV @ 3.5 per km.
// the hst should be calculated at 13% of the base fare.  The gratuity should be calculated at 20% of the base fare.
// The total cost should be the sum of the base fare, hst, gratuity.
// the totalCost, baseFare, hst, gratuity should each be returned with two decimal places.

const calculateRate = (distance: number, vehicle: string) => {
  let baseFare: number
  let hst: number
  let gratuity: number
  let totalCost: number
  switch (vehicle) {
    case 'Luxury Sedan':
      baseFare = distance * 1.7
      hst = baseFare * 0.13
      gratuity = baseFare * 0.2
      totalCost = baseFare + hst + gratuity
      break
    case 'Premium Luxury Sedan':
      baseFare = distance * 1.9
      hst = baseFare * 0.13
      gratuity = baseFare * 0.2
      totalCost = baseFare + hst + gratuity
      break
    case 'Luxury SUV':
      baseFare = distance * 2.75
      hst = baseFare * 0.13
      gratuity = baseFare * 0.2
      totalCost = baseFare + hst + gratuity
      break
    case 'Premium Luxury SUV':
      baseFare = distance * 3.5
      hst = baseFare * 0.13
      gratuity = baseFare * 0.2
      totalCost = baseFare + hst + gratuity
      break
    default:
      baseFare = 0
      hst = 0
      gratuity = 0
      totalCost = 0
      break
  }
  return {
    baseFare,
    hst,
    gratuity,
    totalCost,
  }
}

//make a helper function that will return a number with two decimal places
const roundToTwoDecimalPlaces = (num: number) => {
  return Math.round(num * 100) / 100
}

//write a function that will return a true if the distance is greater than or equal to 30km, and false otherwise
const isLongDistance = (distance: number) => {
  return distance >= 30
}

//write a function that will compare the distance and check the isLongDistance variable to determine if the trip is over 30km, if it is over 30km, subtract the distance by 30km and multiply the remainder by the basefare and add it to the minimum fare.
const calculateMinimumFare = (distance: number) => {
  let minimumFare: number

  if (isLongDistance(distance)) {
    minimumFare = (distance - 30) * 1.7
  } else {
    minimumFare = 80
  }

  return minimumFare
}

//export the functions
export {
  calculateRate,
  roundToTwoDecimalPlaces,
  calculateMinimumFare,
  isLongDistance,
}
