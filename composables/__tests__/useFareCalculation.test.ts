//import the functions  from the useFareCalculation in composables folder and write a unit test for it
import useFareCalculation from '../useFareCalculation'
import { FareDistanceParameters } from '../useFareCalculation'

// destructure the methods from the useFareCalculation object
const {
  baseFareCalculation,
  gratuityCalculation,
  taxCalculation,
  formatTotalFare,
  formatPercentage,
  discountCalculation,
  isPercentage,
  totalDistanceFareCalculation,
} = useFareCalculation

// write a unit test using vitest that tests that the minimum fare is returned when the distance is less than the minimum distance
test('baseFareCalculation should return the minimum fare when the distance is less than the minimum distance', () => {
  // create a FareDistanceCost object
  const fareDistanceCost: FareDistanceParameters = {
    minimumFare: 80,
    minimumDistance: 30,
    costPerKm: 1.75,
  }
  // create a distance variable and assign it a value
  const distance = 29
  // create a variable that holds the fare
  const fare = baseFareCalculation(fareDistanceCost, distance)
  // assert that the fare is equal to the expected fare
  expect(fare).toBe(80)
})

// write a unit test using vitest that tests that the minimum fare is returned when the distance is equal to the minimum distance
test('baseFareCalculation should return the minimum fare when the distance is equal to the minimum distance', () => {
  // create a FareDistanceCost object
  const fareDistanceCost: FareDistanceParameters = {
    minimumFare: 80,
    minimumDistance: 30,
    costPerKm: 1.75,
  }
  // create a distance variable and assign it a value
  const distance = 30
  // create a variable that holds the fare
  const fare = baseFareCalculation(fareDistanceCost, distance)
  // assert that the fare is equal to the expected fare
  expect(fare).toBe(80)
})

// write a unit test using vitest that tests that the fare is calculated correctly when the distance is greater than the minimum distance
test('baseFareCalculation should return the fare when the distance is greater than the minimum distance', () => {
  // create a FareDistanceCost object
  const fareDistanceCost: FareDistanceParameters = {
    minimumFare: 80,
    minimumDistance: 30,
    costPerKm: 1.75,
  }
  // create a distance variable and assign it a value
  const distance = 31
  // create a variable that holds the fare
  const fare = baseFareCalculation(fareDistanceCost, distance)
  // assert that the fare is equal to the expected fare
  expect(fare).toBe(81.75)
})

// write a unit test using vitest that tests the gratuity calculation function
test('gratuityCalculation should return the gratuity', () => {
  // create a fare variable and assign it a value
  const fare = 100
  // create a gratuityRate variable and assign it a value
  const gratuityRate = 10
  // create a variable that holds the gratuity
  const gratuityAmount = gratuityCalculation(fare, gratuityRate)
  // assert that the gratuity is equal to the expected gratuity
  expect(gratuityAmount).toBe(10)
})

// write a unit test using vitest that tests the gratuity calculation function when the gratuity rate is outside of the range of 0 and 100.
test('gratuityCalculation should return an error the when the gratuity rate is outside of the range of 0 and 100', () => {
  // create a fare variable and assign it a value
  const fare = 100
  // create a gratuityRate variable and assign it a value
  const gratuityRate = 110
  // assert that an error is thrown
  expect(() => {
    gratuityCalculation(fare, gratuityRate)
  }).toThrow('Gratuity rate must be between 0 and 100')
})

// write a unit test using vitest that tests the tax calculation function
test('taxCalculation should return the tax', () => {
  // create a fare variable and assign it a value
  const fare = 100
  // create a taxRate variable and assign it a value
  const taxRate = 10
  // create a variable that holds the tax
  const taxAmount = taxCalculation(fare, taxRate)
  // assert that the tax is equal to the expected tax
  expect(taxAmount).toBe(10)
})

// write a unit test using vitest that tests the tax calculation function when the tax rate is outside of the range of 0 and 100.
test('taxCalculation should return an error the when the tax rate is outside of the range of 0 and 100', () => {
  // create a fare variable and assign it a value
  const fare = 100
  // create a taxRate variable and assign it a value
  const taxRate = 110
  // assert that an error is thrown
  expect(() => {
    taxCalculation(fare, taxRate)
  }).toThrow('Tax rate must be between 0 and 100')
})

// write a unit test using vitest that tests the format total fare function
test('formatTotalFare should return the total fare with two decimal places and that it is rounded up', () => {
  // create a total fare variable and assign it a value
  const totalFare = 133.681768
  // create a variable that holds the formatted total fare
  const formattedTotalFare = formatTotalFare(totalFare)
  // assert that the formatted total fare is equal to the expected formatted total fare
  expect(formattedTotalFare).toBe(133.69)
})

// write a unit test using vitest that tests the discount calculation function
test('discountCalculation should return the discounted rate total', () => {
  // create a fare variable and assign it a value
  const fare = 100
  // create a discount variable and assign it a value
  const discount = 10
  // create a variable that holds the discount
  const discountAmount = discountCalculation(fare, discount)
  // assert that the discount is equal to the expected discount
  expect(discountAmount).toBe(90)
})

// write a unit test using vitest that tests the format percentage function
test('formatPercentage should return the percentage as a number between 0 and 1', () => {
  // create a percentage variable and assign it a value
  const percentage = 10
  // create a variable that holds the formatted percentage
  const formattedPercentage = formatPercentage(percentage)
  // assert that the formatted percentage is equal to the expected formatted percentage
  expect(formattedPercentage).toBe(0.1)
})

// write a unit test using vitest that tests the format percentage function when the percentage is outside of the range of 0 and 100.
test('formatPercentage should return an error the when the percentage is outside of the range of 0 and 100', () => {
  // create a percentage variable and assign it a value
  const percentage = 110
  // assert that an error is thrown
  expect(() => {
    formatPercentage(percentage)
  }).toThrow('Percentage amount must be between 0 and 100')
})

// write a unit test using vitest that tests the isPercentage function
test('isPercentage should return true when the percentage is between 0 and 1', () => {
  // create a percentage variable and assign it a value
  let percentage = 0.1
  // assert that the percentage is true
  expect(isPercentage(percentage)).toBe(true)
  percentage = 1.1
  // assert that the percentage is false
  expect(isPercentage(percentage)).toBe(false)
})

// write a unit test using vitest that tests the total distance fare calculation function
test('totalDistanceFareCalculation should return the total fare', () => {
  // create a FareDistanceCost object
  const fareDistanceCost: FareDistanceParameters = {
    minimumFare: 80,
    minimumDistance: 30,
    costPerKm: 1.75,
  }
  // create a distance variable and assign it a value
  const distance = 100
  // create a gratuityRate variable and assign it a value
  const gratuityRate = 10
  // create a taxRate variable and assign it a value
  const taxRate = 10
  // create a variable that holds the total fare
  const totalFare = totalDistanceFareCalculation(
    fareDistanceCost,
    distance,
    gratuityRate,
    taxRate
  )
  // assert that the total fare is equal to the expected total fare
  expect(totalFare).toBe(243)
})
