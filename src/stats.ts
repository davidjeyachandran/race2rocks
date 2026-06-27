import { getSeconds } from './utilities'

export function formatSeconds(total: number): string {
    const minutes = Math.floor(total / 60)
    const seconds = total % 60
    return `${minutes}:${String(seconds).padStart(2, '0')}`
}

export interface RecordEntry {
    category: string
    name: string
    time: string
    year: number
}

/** Fastest finish in each category, sorted fastest-first. */
export function courseRecords(data: RunDataType[]): RecordEntry[] {
    const categories = Array.from(new Set(data.map(item => item.category)))
    return categories
        .map(category => {
            const best = data
                .filter(item => item.category === category)
                .reduce((fastest, item) =>
                    getSeconds(item.time) < getSeconds(fastest.time) ? item : fastest
                )
            return { category, name: best.name, time: best.time, year: best.year }
        })
        .sort((a, b) => getSeconds(a.time) - getSeconds(b.time))
}

/** Single fastest finish across every category and year. */
export function fastestEver(data: RunDataType[]): RunDataType | null {
    if (data.length === 0) return null
    return data.reduce((fastest, item) =>
        getSeconds(item.time) < getSeconds(fastest.time) ? item : fastest
    )
}

export interface AppearanceCount {
    name: string
    count: number
}

/** Runners ranked by how many times they have finished. */
export function appearanceCounts(data: RunDataType[]): AppearanceCount[] {
    const counts = new Map<string, number>()
    data.forEach(item => counts.set(item.name, (counts.get(item.name) ?? 0) + 1))
    return Array.from(counts, ([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
}

export interface YearCount {
    year: number
    count: number
}

/** Number of finishers per edition, oldest-first. */
export function participationByYear(data: RunDataType[]): YearCount[] {
    const counts = new Map<number, number>()
    data.forEach(item => counts.set(item.year, (counts.get(item.year) ?? 0) + 1))
    return Array.from(counts, ([year, count]) => ({ year, count }))
        .sort((a, b) => a.year - b.year)
}

/** The edition with the most finishers. */
export function biggestField(data: RunDataType[]): YearCount | null {
    const years = participationByYear(data)
    if (years.length === 0) return null
    return years.reduce((biggest, item) => (item.count > biggest.count ? item : biggest))
}

export function uniqueRunnerCount(data: RunDataType[]): number {
    return new Set(data.map(item => item.name)).size
}

export function editionYears(data: RunDataType[]): number[] {
    return Array.from(new Set(data.map(item => item.year))).sort((a, b) => a - b)
}

/** The top three finishers (overall, by time) for a single year. */
export function podium(data: RunDataType[], year: number): RunDataType[] {
    return data
        .filter(item => item.year === year)
        .sort((a, b) => getSeconds(a.time) - getSeconds(b.time))
        .slice(0, 3)
}

export interface RunnerYear {
    year: number
    time: string
    seconds: number
    category: string
    placeInCategory: number
    fieldInCategory: number
    placeOverall: number
    fieldOverall: number
}

export interface RunnerProfileData {
    name: string
    appearances: number
    personalBest: RunDataType
    bestFinish: { placeOverall: number; fieldOverall: number; year: number }
    years: RunnerYear[]
}

/** Full competitive history for one runner, including placings per edition. */
export function runnerProfile(data: RunDataType[], name: string): RunnerProfileData | null {
    const runs = data.filter(item => item.name === name)
    if (runs.length === 0) return null

    const years: RunnerYear[] = runs
        .map(run => {
            const fieldOverallList = data
                .filter(item => item.year === run.year)
                .sort((a, b) => getSeconds(a.time) - getSeconds(b.time))
            const fieldCategoryList = fieldOverallList.filter(
                item => item.category === run.category
            )
            return {
                year: run.year,
                time: run.time,
                seconds: getSeconds(run.time),
                category: run.category,
                placeOverall:
                    fieldOverallList.findIndex(
                        item => item.name === run.name && item.time === run.time
                    ) + 1,
                fieldOverall: fieldOverallList.length,
                placeInCategory:
                    fieldCategoryList.findIndex(
                        item => item.name === run.name && item.time === run.time
                    ) + 1,
                fieldInCategory: fieldCategoryList.length,
            }
        })
        .sort((a, b) => a.year - b.year)

    const personalBestRun = runs.reduce((best, item) =>
        getSeconds(item.time) < getSeconds(best.time) ? item : best
    )
    const bestFinishYear = years.reduce((best, item) =>
        item.placeOverall < best.placeOverall ? item : best
    )

    return {
        name,
        appearances: runs.length,
        personalBest: personalBestRun,
        bestFinish: {
            placeOverall: bestFinishYear.placeOverall,
            fieldOverall: bestFinishYear.fieldOverall,
            year: bestFinishYear.year,
        },
        years,
    }
}
