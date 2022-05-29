import { getSeconds } from './utilities'

export function sortByTime(a: { time: string }, b: { time: string }) {
    let secondsA = getSeconds(a.time)
    let secondsB = getSeconds(b.time)
    if (secondsA > secondsB) {
        return 1;
    }
    if (secondsB > secondsA) {
        return -1;
    }
    return 0;
}

export function sortByname(a: { name: string }, b: { name: string }) {
    return (a.name > b.name) ? 1 : (a.name < b.name) ? -1 : 0
}

export function sortByYear(a: { year: number }, b: { year: number }) {
    return (a.year > b.year) ? 1 : (a.year < b.year) ? -1 : 0
}