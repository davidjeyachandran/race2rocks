import React, { useState, useEffect } from 'react';
import { getDataFromServer } from './utilities'
import './styles/skeleton.css';
import Results from './components/Results'
import SearchForm from './components/SearchForm'
import { pluck } from './utilities'
import ChartLine from './components/ChartLine'
import { sortByTime } from './sort'
import './App.css'

type RunEntry = {
  Name: string,
  Time: string,
  Year: number,
  Category: string
}

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

  function filterName(name: string) {
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

  function setYear(year: number) {
    let filteredData = data.filter((item: RunEntry) =>
      item.Year === year
    )
    setFilteredData(filteredData)
    setIsOnePerson(false)
  }

  function setCategory(category: string) {
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
    <div className="App container" style={{ maxWidth: '400px' }}>
      <h1>Race to the Rocks</h1>
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
    </div>
  );
}

export default App;
