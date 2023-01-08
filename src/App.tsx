import { Container } from '@mui/material';
import { useState, useEffect } from 'react';
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
    const [isSinglePersonResults, setIsSinglePersonResults] = useState(false);

    function filterYear(yearSelected: number) {
        if (yearSelected < 0) {
            setFilteredData(data)
            return
        }
        const filtered = data.filter(item => item.year === yearSelected)
        setFilteredData(filtered)
    }

    function filterName(search: string) {
        const filtered = data.filter(item =>
            item.name.toLowerCase().includes(search.toLowerCase())
        )
        setFilteredData(filtered)
        const names = pluck(filtered, 'name')
        if (names.length === 1) {
            setIsSinglePersonResults(true)
        }
        else {
            setIsSinglePersonResults(false)
        }
    }

    function filterCategory(category: string) {
        if (category === '') {
            setFilteredData(data)
            return
        }
        const filtered = data.filter(item =>
            item.category === category
        )
        setFilteredData(filtered)
    }

    useEffect(() => {
        setFilteredData(data.sort(sortByTime))
        setYears(['All'].concat(pluck(data, 'year')))
        setCategories(['All'].concat(pluck(data, 'category')))
    }, [data])

    return (
        <>
            <Header title='Race 2 the Rocks' />
            <Container maxWidth="sm" >
                <SearchForm
                    years={years}
                    categories={categories}
                    filterName={filterName}
                    filterYear={filterYear}
                    filterCategory={filterCategory}
                />
                {isLoading ? <p>Loading...</p>
                    : <Results data={filteredData} />}
                {isSinglePersonResults && <ChartLine filteredData={filteredData} />}
            </Container>
        </>
    );
}

export default App;
