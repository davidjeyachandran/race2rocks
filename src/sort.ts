import { getSeconds } from './utilities'

export function sortByTime(a: { Time: string }, b: { Time: string }) {
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

export function sortByName(a: { Name: string }, b: { Name: string }) {
  return (a.Name > b.Name) ? 1 : (a.Name < b.Name) ? -1 : 0
}

export function sortByYear(a: { Year: number }, b: { Year: number }) {
  return (a.Year > b.Year) ? 1 : (a.Year < b.Year) ? -1 : 0
}