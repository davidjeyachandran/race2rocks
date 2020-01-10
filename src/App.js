import React, { useState, useEffect } from 'react';
import { getDataFromServer } from './utilities'
import './styles/skeleton.css';
import Results from './components/Results'
import SearchForm from './components/SearchForm'
import { pluck } from './utilities'
import ChartLine from './components/ChartLine'
import { sortByTime } from './sort'

function App() {

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [years, setYears] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isOnePerson, setIsOnePerson] = useState(false);

  useEffect(() => {
    getDataFromServer('race2rocks.json')
      .then(data => {
        setData(data)
        setFilteredData(data.sort(sortByTime))
        setYears(pluck(data, 'Year'))
        let categoriesData = pluck(data, 'Category')
        categoriesData.unshift('All')
        setCategories(categoriesData)

      })
  }, [])

  function filterName(name) {
    let filteredData = data.filter(item =>
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

  function setYear(year) {
    let filteredData = data.filter(item =>
      item.Year === year
    )
    setFilteredData(filteredData)
  }

  function setCategory(category) {
    if (category === 'All') {
      setFilteredData(data)
    } else {
      let newFilteredData = data.filter(item =>
        item.Category === category
      )
      setFilteredData(newFilteredData)
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
      <Results data={filteredData} />
      {isOnePerson ?
        <ChartLine filteredData={filteredData} /> :
        ''}
    </div>
  );
}

export default App;
