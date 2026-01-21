import { Button, Chip, Container, LinearProgress, Paper, Stack, Typography } from '@mui/material';
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

    const [data, isLoading] = useLoadData(ENDPOINT)
    const isSinglePersonResults = useMemo(() => {
        if (filteredData.length === 0) return false
        return new Set(filteredData.map(item => item.name)).size === 1
    }, [filteredData])

    function showAll() {
        setFilteredData([...data].sort(sortByTime))
    }

    function clearFilters() {
        setFilters({ search: '', year: 'All', category: 'All' })
        showAll()
    }

    function filterYear(yearSelected: number) {
        if (yearSelected < 0) {
            showAll()
            return
        }
        const filtered = data.filter(item => item.year === yearSelected)
        setFilteredData([...filtered].sort(sortByTime))
    }

    function filterName(search: string) {
        const filtered = data.filter(item =>
            item.name.toLowerCase().includes(search.toLowerCase())
        )
        setFilteredData([...filtered].sort(sortByTime))
    }

    function filterCategory(category: string) {
        if (category === '') {
            showAll()
            return
        }
        const filtered = data.filter(item =>
            item.category === category
        )
        setFilteredData([...filtered].sort(sortByTime))
    }

    useEffect(() => {
        showAll()
        setYears(['All'].concat(pluck(data, 'year')))
        setCategories(['All'].concat(pluck(data, 'category')))
    }, [data])

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
                            setFilters({ search, year: 'All', category: 'All' })
                            filterName(search)
                        }}
                        onYearChange={(year) => {
                            const yearSelected: number = Number.isFinite(Number.parseInt(year, 10)) ? Number.parseInt(year, 10) : -1
                            setFilters({ search: '', year, category: 'All' })
                            filterYear(yearSelected)
                        }}
                        onCategoryChange={(category) => {
                            setFilters({ search: '', year: 'All', category })
                            filterCategory(category === 'All' ? '' : category)
                        }}
                    />
                    {hasActiveFilters && (
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems={{ sm: 'center' }}>
                            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ flex: 1 }}>
                                {filters.search !== '' && (
                                    <Chip
                                        label={`Search: ${filters.search}`}
                                        onDelete={() => {
                                            setFilters({ search: '', year: 'All', category: 'All' })
                                            filterName('')
                                        }}
                                        variant="outlined"
                                        size="small"
                                    />
                                )}
                                {filters.year !== 'All' && (
                                    <Chip
                                        label={`Year: ${filters.year}`}
                                        onDelete={() => {
                                            setFilters({ search: '', year: 'All', category: 'All' })
                                            filterYear(-1)
                                        }}
                                        variant="outlined"
                                        size="small"
                                    />
                                )}
                                {filters.category !== 'All' && (
                                    <Chip
                                        label={`Category: ${filters.category}`}
                                        onDelete={() => {
                                            setFilters({ search: '', year: 'All', category: 'All' })
                                            filterCategory('')
                                        }}
                                        variant="outlined"
                                        size="small"
                                    />
                                )}
                            </Stack>
                            <Button variant="text" onClick={clearFilters} sx={{ alignSelf: { xs: 'flex-start', sm: 'center' } }}>
                                Clear filters
                            </Button>
                        </Stack>
                    )}
                    {isLoading ? (
                        <LinearProgress />
                    ) : (
                        <>
                            <Typography variant="body2" color="text.secondary">
                                {filteredData.length} result{filteredData.length === 1 ? '' : 's'}
                            </Typography>
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
