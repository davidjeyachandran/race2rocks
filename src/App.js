import React, { useState, useEffect } from 'react';
import { getDataFromServer } from './utilities'
import './styles/skeleton.css';
import Results from './components/Results'
import SearchForm from './components/SearchForm'
import { pluck } from './utilities'

function App() {

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [years, setYears] = useState([]);
  const [categories, setCategories] = useState([]);

  function sortByTime(a, b) {

    let secondsA = getSeconds(a.Time)
    let secondsB = getSeconds(b.Time)
    if (secondsA > secondsB) {
      return 1;
    }
    if (secondsB > secondsA) {
      return -1;
    }
    return 0;
  }

  function sortByName(a, b) {
    return (a.Name > b.Name) ? 1 : (a.Name < b.Name) ? -1 : 0
  }

  function getSeconds(time) {
    const DIVIDER = ':'
    let timeArray = time.split(DIVIDER)

    let length = timeArray.length
    let seconds = 0
    timeArray.forEach((item, i) => {
      seconds += parseInt(item) * (Math.pow(60, (length - i - 1)))
    })
    return seconds;
  }

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
    </div>
  );
}

export default App;
