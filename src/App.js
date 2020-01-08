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

  useEffect(() => {
    getDataFromServer('race2rocks.json')
      .then(data => {
        setData(data)
        setFilteredData(data.sort())
        setYears(pluck(data, 'Year'))
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

  return (
    <div className="App container" style={{ maxWidth: '400px' }}>
      <h1>Race to the Rocks</h1>
      <SearchForm years={years} setYear={setYear} filterName={filterName} />
      <Results data={filteredData} />
    </div>
  );
}

export default App;
