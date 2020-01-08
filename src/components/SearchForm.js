import React, { useState } from 'react'
import '../styles/SearchForm.css'

function SearchForm({ years, setYear, filterName, categories, setCategory }) {

  const [name, setName] = useState('');

  function handleChange(e) {
    let name = e.target.value
    setName(name)
    filterName(name)
  }

  function handleClick(e) {
    let year = e.currentTarget.dataset.id
    setName('')
    setYear(parseInt(year))
  }

  function handleClickCategories(e) {
    let category = e.currentTarget.dataset.id
    setName('')
    setCategory(category)
  }
  const listStyle = { float: 'left', textDecoration: 'underline', listStyle: 'none', padding: '10px' }

  return (
    <div>
      <ul>
        {years.map(item => <li onClick={handleClick} key={item} data-id={item} style={listStyle}>{item}</li>)}
      </ul>
      <ul>
        {categories.map(item => <li onClick={handleClickCategories} key={item} data-id={item} style={listStyle}>{item}</li>)}
      </ul>
      <br />
      <input className="clearfix" placeholder="search..." onChange={handleChange} value={name} />
    </div>
  )
}

export default SearchForm
