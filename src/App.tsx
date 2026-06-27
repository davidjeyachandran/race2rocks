import { Alert, Box, Button, Chip, Container, LinearProgress, Stack, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import Hero from './components/Hero'
import StatBand from './components/StatBand'
import Podium from './components/Podium'
import RunnerProfile from './components/RunnerProfile'
import SearchForm from './components/SearchForm';
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

    function clearFilters() {
        setFilters({ search: '', year: 'All', category: 'All' })
    }

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
        if (yearInitialized || allYears.length === 0) return
        const currentYear = new Date().getFullYear()
        const defaultYear = allYears.includes(currentYear) ? currentYear : allYears[allYears.length - 1]
        setFilters(prev => ({ ...prev, year: String(defaultYear) }))
        setYearInitialized(true)
    }, [allYears, yearInitialized])

    useEffect(() => {
        setFilteredData(applyFilters(data, filters))
    }, [data, filters])

    const hasActiveFilters = filters.search !== '' || filters.year !== 'All' || filters.category !== 'All'

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
                    <SearchForm
                        years={years}
                        categories={categories}
                        value={filters}
                        onSearchChange={(search) => {
                            setFilters(prev => ({ ...prev, search }))
                        }}
                        onYearChange={(year) => {
                            setFilters(prev => ({ ...prev, year }))
                        }}
                        onCategoryChange={(category) => {
                            setFilters(prev => ({ ...prev, category }))
                        }}
                    />
                    {hasActiveFilters && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 1,
                                    flex: 1,
                                    flexWrap: { xs: 'nowrap', sm: 'wrap' },
                                    overflowX: { xs: 'auto', sm: 'visible' },
                                    WebkitOverflowScrolling: 'touch',
                                    py: 0.5,
                                }}
                            >
                                {filters.search !== '' && (
                                    <Chip
                                        label={`Search: ${filters.search}`}
                                        onDelete={() => {
                                            setFilters(prev => ({ ...prev, search: '' }))
                                        }}
                                        variant="outlined"
                                        size="small"
                                    />
                                )}
                                {filters.year !== 'All' && (
                                    <Chip
                                        label={`Year: ${filters.year}`}
                                        onDelete={() => {
                                            setFilters(prev => ({ ...prev, year: 'All' }))
                                        }}
                                        variant="outlined"
                                        size="small"
                                    />
                                )}
                                {filters.category !== 'All' && (
                                    <Chip
                                        label={`Category: ${filters.category}`}
                                        onDelete={() => {
                                            setFilters(prev => ({ ...prev, category: 'All' }))
                                        }}
                                        variant="outlined"
                                        size="small"
                                    />
                                )}
                            </Box>
                            <Button variant="text" onClick={clearFilters}>
                                Clear filters
                            </Button>
                        </Box>
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
                            {podiumYear !== null && (
                                <Podium data={data} year={podiumYear} onSelectRunner={setSelectedRunner} />
                            )}
                            {filteredData.length > 0 && (
                                <Typography variant="body2" color="text.secondary">
                                    {filteredData.length} result{filteredData.length === 1 ? '' : 's'}
                                </Typography>
                            )}
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
