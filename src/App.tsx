import { Container, LinearProgress, Paper, Stack, Typography } from '@mui/material';
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

    const [data, isLoading] = useLoadData(ENDPOINT)
    const isSinglePersonResults = useMemo(() => {
        if (filteredData.length === 0) return false
        return new Set(filteredData.map(item => item.name)).size === 1
    }, [filteredData])

    function showAll() {
        setFilteredData([...data].sort(sortByTime))
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

    return (
        <>
            <Header title='Race 2 the Rocks' />
            <Container maxWidth="md" sx={{ py: 3 }}>
                <Stack spacing={2}>
                    <SearchForm
                        years={years}
                        categories={categories}
                        filterName={filterName}
                        filterYear={filterYear}
                        filterCategory={filterCategory}
                    />
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
