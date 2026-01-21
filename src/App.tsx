import { Alert, Box, Button, Chip, Container, LinearProgress, Paper, Stack, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header'
import SearchForm from './components/SearchForm';
import { pluck } from './utilities';
import { sortByTime } from './sort'
import Results from './components/Results';
import useLoadData from './hooks/useLoadData';
import ChartLine from './components/ChartLine';

const ENDPOINT = 'data.json'

function App() {
    const [filteredData, setFilteredData] = useState<RunDataType[]>([]);
    const [years, setYears] = useState<string[]>(['All']);
    const [categories, setCategories] = useState<string[]>([]);
    const [filters, setFilters] = useState<{ search: string; year: string; category: string }>({
        search: '',
        year: 'All',
        category: 'All',
    })

    const [data, isLoading, error, reload] = useLoadData(ENDPOINT)
    const isSinglePersonResults = useMemo(() => {
        if (filteredData.length === 0) return false
        return new Set(filteredData.map(item => item.name)).size === 1
    }, [filteredData])

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
        setYears(['All'].concat(pluck(data, 'year')))
        setCategories(['All'].concat(pluck(data, 'category')))
    }, [data])

    useEffect(() => {
        setFilteredData(applyFilters(data, filters))
    }, [data, filters])

    const hasActiveFilters = filters.search !== '' || filters.year !== 'All' || filters.category !== 'All'

    return (
        <>
            <Header title='Race 2 the Rocks' />
            <Container maxWidth="md" sx={{ py: 3 }}>
                <Stack spacing={2}>
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
                            {filteredData.length > 0 && (
                                <Typography variant="body2" color="text.secondary">
                                    {filteredData.length} result{filteredData.length === 1 ? '' : 's'}
                                </Typography>
                            )}
                            <Results data={filteredData} />
                        </>
                    )}
                    {isSinglePersonResults && (
                        <Paper variant="outlined" sx={{ p: 2 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                                Trend over time
                            </Typography>
                            <ChartLine filteredData={filteredData} />
                        </Paper>
                    )}
                </Stack>
            </Container>
        </>
    );
}

export default App;
