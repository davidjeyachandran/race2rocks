import React, { useState } from 'react'
import '../styles/SearchForm.css'

function SearchForm({ years, setYear, filterName }) {

  const [name, setName] = useState('');

  function handleChange(e) {
    let name = e.target.value
    setName(name)
    filterName(name)
  }

  function handleClick(e) {
    let year = e.currentTarget.dataset.id
    setYear(parseInt(year))
    console.log(year);

  }

  const listStyle = { float: 'left', textDecoration: 'underline', listStyle: 'none', padding: '0 10px' }

  return (
    <div>
      <ul>
        {years.map(item => <li onClick={handleClick} key={item} data-id={item} style={listStyle}>{item}</li>)}
      </ul>
      <br />
      <input className="clearfix" placeholder="search..." onChange={handleChange} value={name} />
    </div>
  )
}

export default SearchForm
