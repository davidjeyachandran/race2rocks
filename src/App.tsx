import React, { useState, useEffect } from 'react';
import { getDataFromServer } from './utilities'
import Results from './components/Results'
import SearchForm from './components/SearchForm'
import { pluck } from './utilities'
import ChartLine from './components/ChartLine'
import { sortByTime } from './sort'
import { Container } from '@mui/material';
import Header from './components/Header';

function App() {
    const [data, setData] = useState<RunEntry[]>([]);
    const [filteredData, setFilteredData] = useState<RunEntry[]>([]);
    const [years, setYears] = useState<string[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [isOnePerson, setIsOnePerson] = useState<boolean>(false);

    const DATA_LOCATION = 'data.json'

    useEffect(() => {
        getDataFromServer(DATA_LOCATION)
            .then(data => {
                setData(data)
                setFilteredData(data.sort(sortByTime))
                setYears(pluck(data, 'Year'))
                let categoriesData = pluck(data, 'Category')
                categoriesData.unshift('All')
                setCategories(categoriesData)

            })
    }, [])

    const filterName = (name: string): void => {
        let filteredData: RunEntry[] = data.filter((item: RunEntry) =>
            item.Name.toLowerCase().includes(name.toLowerCase())
        )
        setFilteredData(filteredData)

        let nameList = pluck(filteredData, 'Name')
        if (nameList.length === 1) {
            setIsOnePerson(true)
        } else {
            setIsOnePerson(false)
        }
    }

    const setYear = (year: number): void => {
        let filteredData = data.filter((item: RunEntry) =>
            item.Year === year
        )
        setFilteredData(filteredData)
        setIsOnePerson(false)
    }

    const setCategory = (category: string): void => {
        if (category === 'All') {
            setFilteredData(data)
        } else {
            let newFilteredData = data.filter((item: RunEntry) =>
                item.Category === category
            )
            setFilteredData(newFilteredData)
            setIsOnePerson(false)
        }
    }

    return (
        <React.Fragment>
            <Header />
            <Container maxWidth="sm" >
                <SearchForm
                    years={years}
                    setYear={setYear}
                    filterName={filterName}
                    categories={categories}
                    setCategory={setCategory}
                />
                {isOnePerson ?
                    <ChartLine filteredData={filteredData} /> :
                    ''}
                <Results data={filteredData} />
            </Container>
        </React.Fragment>
    );
}

export default App;
