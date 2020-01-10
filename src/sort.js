import { getSeconds } from './utilities'

export function sortByTime(a, b) {
  let secondsA = getSeconds(a.Time)
  let secondsB = getSeconds(b.Time)
  if (secondsA > secondsB) {
    return 1;
  }
  if (secondsB > secondsA) {
    return -1;
  }
  return 0;
}

export function sortByName(a, b) {
  return (a.Name > b.Name) ? 1 : (a.Name < b.Name) ? -1 : 0
}

export function sortByYear(a, b) {
  return (a.Year > b.Year) ? 1 : (a.Year < b.Year) ? -1 : 0
}