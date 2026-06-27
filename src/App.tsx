import { Alert, Button, Container, LinearProgress, Stack, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import Hero from './components/Hero'
import StatBand from './components/StatBand'
import Podium from './components/Podium'
import RunnerProfile from './components/RunnerProfile'
import SearchBar from './components/SearchBar'
import Filters from './components/Filters'
import { pluck } from './utilities';
import { sortByTime } from './sort'
import { editionYears } from './stats'
import Results from './components/Results';
import useLoadData from './hooks/useLoadData';

const ENDPOINT = 'data.json'

// Set this to the next race date to show a live countdown in the hero, e.g. new Date('2027-01-04').
const NEXT_RACE: Date | undefined = undefined

function App() {
    const [filteredData, setFilteredData] = useState<RunDataType[]>([]);
    const [years, setYears] = useState<string[]>(['All']);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedRunner, setSelectedRunner] = useState<string | null>(null)
    const [filters, setFilters] = useState<{ search: string; year: string; category: string }>({
        search: '',
        year: 'All',
        category: 'All',
    })

    const [data, isLoading, error, reload] = useLoadData(ENDPOINT)

    const allYears = useMemo(() => editionYears(data), [data])
    const latestYear = allYears.length > 0 ? allYears[allYears.length - 1] : null
    const podiumYear = filters.year !== 'All' ? Number.parseInt(filters.year, 10) : latestYear

    // The edition to land on by default: the current calendar year if it has run, else the latest.
    const defaultYear = useMemo(() => {
        if (allYears.length === 0) return 'All'
        const currentYear = new Date().getFullYear()
        return String(allYears.includes(currentYear) ? currentYear : allYears[allYears.length - 1])
    }, [allYears])

    const isSearching = filters.search.trim() !== ''

    function applyFilters(input: RunDataType[], f: { search: string; year: string; category: string }) {
        let out = input

        const search = f.search.trim().toLowerCase()
        if (search !== '') {
            out = out.filter(item => item.name.toLowerCase().includes(search))
        }

        if (f.year !== 'All') {
            const yearSelected = Number.parseInt(f.year, 10)
            if (Number.isFinite(yearSelected)) {
                out = out.filter(item => item.year === yearSelected)
            }
        }

        if (f.category !== 'All') {
            out = out.filter(item => item.category === f.category)
        }

        return [...out].sort(sortByTime)
    }

    useEffect(() => {
        setYears(['All'].concat(pluck(data, 'year').map(String)))
        setCategories(['All'].concat(pluck(data, 'category')))
    }, [data])

    // Default the year filter to the current edition once data has loaded.
    const [yearInitialized, setYearInitialized] = useState(false)
    useEffect(() => {
        if (yearInitialized || defaultYear === 'All') return
        setFilters(prev => ({ ...prev, year: defaultYear }))
        setYearInitialized(true)
    }, [defaultYear, yearInitialized])

    useEffect(() => {
        setFilteredData(applyFilters(data, filters))
    }, [data, filters])

    function handleSearchChange(search: string) {
        setFilters(prev => {
            if (search.trim() !== '') {
                // A name search spans every edition and category.
                return { ...prev, search, year: 'All', category: 'All' }
            }
            // Clearing the search returns to browsing the latest edition.
            return { ...prev, search: '', year: defaultYear, category: 'All' }
        })
    }

    return (
        <>
            <Hero
                title='Race 2 the Rocks'
                editions={allYears.length}
                firstYear={allYears[0]}
                lastYear={latestYear ?? undefined}
                nextRace={NEXT_RACE}
            />
            <Container maxWidth="md" sx={{ py: 3 }}>
                <Stack spacing={2}>
                    {!isLoading && !error && <StatBand data={data} />}

                    <SearchBar value={filters.search} onChange={handleSearchChange} />

                    {!isSearching && (
                        <Filters
                            years={years}
                            categories={categories}
                            value={filters}
                            onYearChange={(year) => setFilters(prev => ({ ...prev, year }))}
                            onCategoryChange={(category) => setFilters(prev => ({ ...prev, category }))}
                        />
                    )}

                    {isLoading ? (
                        <LinearProgress />
                    ) : error ? (
                        <Alert
                            severity="error"
                            variant="outlined"
                            action={
                                <Button color="inherit" size="small" onClick={reload}>
                                    Retry
                                </Button>
                            }
                        >
                            Couldn&apos;t load results.
                        </Alert>
                    ) : (
                        <>
                            {!isSearching && podiumYear !== null && (
                                <Podium data={data} year={podiumYear} onSelectRunner={setSelectedRunner} />
                            )}
                            <Typography variant="body2" color="text.secondary">
                                {filteredData.length} result{filteredData.length === 1 ? '' : 's'}
                                {isSearching
                                    ? ` for “${filters.search.trim()}” across all years`
                                    : filters.year !== 'All'
                                        ? ` · ${filters.year}`
                                        : ''}
                            </Typography>
                            <Results data={filteredData} onSelectRunner={setSelectedRunner} />
                        </>
                    )}
                </Stack>
            </Container>
            <RunnerProfile data={data} name={selectedRunner} onClose={() => setSelectedRunner(null)} />
        </>
    );
}

export default App;
