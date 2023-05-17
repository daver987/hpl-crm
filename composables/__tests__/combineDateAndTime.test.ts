import { test, describe, expect } from 'vitest'
import { combineDateAndTime } from '~/composables'
/*
Code Analysis:
- The main goal of the function is to combine a date string and a time string into a single ISO 8601 date-time string.
- It takes two string inputs: a date string and a time string.
- The function first removes any ordinal suffixes (e.g. "st", "nd", "rd", "th") from the date string using a regular expression.
- It then combines the formatted date string and the time string into a single string.
- The function creates a new Date object from the combined date-time string.
- It logs the resulting Date object to the console for debugging purposes.
- Finally, the function returns the ISO 8601 date-time string representation of the Date object.
*/

/*
Test Plan:
- test_validDateAndTime: tests that the function correctly combines a valid date and time string. Tags: [happy path]
- test_noOrdinalSuffix: tests that the function correctly removes ordinal suffixes from the date string. Tags: [happy path]
- test_ordinalSuffix: tests that the function correctly handles date strings with ordinal suffixes. Tags: [edge case]
- test_invalidDate: tests that the function correctly handles an invalid date string. Tags: [edge case]
- test_invalidTime: tests that the function correctly handles an invalid time string. Tags: [edge case]
- test_missingMinutes: tests that the function correctly handles a time string with missing minutes. Tags: [edge case]
- test_timezone: tests that the function correctly handles timezone issues when creating the Date object. Tags: [edge case]
- test_dst: tests that the function correctly handles daylight saving time changes affecting the Date object. Tags: [edge case]
- test_returnValue: tests that the function returns an ISO 8601 date-time string. Tags: [happy path]
- test_consoleLog: tests that the function logs the resulting Date object to the console. Tags: [happy path]
*/

describe('combineDateAndTime_function', () => {
  test('test_validDateAndTime', () => {
    const dateString = '2022-01-01'
    const timeString = '12:00:00'
    const expectedOutput = '2022-01-01T12:00:00.000Z'
    expect(combineDateAndTime(dateString, timeString)).toEqual(expectedOutput)
  })
  test('test_noOrdinalSuffix', () => {
    const dateString = '2022-01-01st'
    const timeString = '12:00:00'
    const expectedOutput = '2022-01-01T12:00:00.000Z'
    expect(combineDateAndTime(dateString, timeString)).toEqual(expectedOutput)
  })
  test('test_ordinalSuffix', () => {
    const dateString = '2022-01-01st'
    const timeString = '12:00:00'
    const expectedOutput = '2022-01-01T12:00:00.000Z'
    expect(combineDateAndTime(dateString, timeString)).toEqual(expectedOutput)
  })
  test('test_invalidDate', () => {
    const dateString = '2022-13-01'
    const timeString = '12:00:00'
    expect(() => combineDateAndTime(dateString, timeString)).toThrow()
  })
  test('test_invalidTime', () => {
    const dateString = '2022-01-01'
    const timeString = '25:00:00'
    expect(() => combineDateAndTime(dateString, timeString)).toThrow()
  })
  test('test_missingMinutes', () => {
    const dateString = '2022-01-01'
    const timeString = '12:00'
    const expectedOutput = '2022-01-01T12:00:00.000Z'
    expect(combineDateAndTime(dateString, timeString)).toEqual(expectedOutput)
  })
})
