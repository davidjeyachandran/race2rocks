import React from 'react'
import { ChangeEvent, useState } from 'react'
import { Box, InputLabel, MenuItem, Button, TextField } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface SearchFormProps {
    years: string[]
    categories: string[]
    filterName: (name: string) => void
    filterYear: (year: number) => void
    filterCategory: (category: string) => void
}

function SearchForm(props: SearchFormProps) {
    const { years, categories, filterName, filterYear, filterCategory } = props
    const [year, setYear] = useState('All')
    const [search, setSearch] = useState('');

    const handleChangeSelect = (event: SelectChangeEvent) => {
        const year: number = isNaN(parseInt(event.target.value)) ? -1 : parseInt(event.target.value)
        setYear(event.target.value)
        filterYear(year)
        setSearch('')
    }

    const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        const name: string = event.target.value
        setSearch(name)
        filterName(name)
    }

    const handleCategoryClick = (event: React.MouseEvent) => {
        let value: string = event.currentTarget.getAttribute('data-id') || ''
        if (value === 'All') value = ''
        filterCategory(value)
        setSearch('')
    }

    return (
        <Box display="flex" flexWrap='wrap' justifyContent="space-between" marginY={2} border="thin">

            <InputLabel id="demo-simple-select-label">Year</InputLabel>
            <Select
                fullWidth
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={year}
                label="Year"
                onChange={handleChangeSelect}
                sx={{ mb: 2 }}
            >
                {years && years.length > 0 && years.map((item: string) => (
                    <MenuItem key={item} value={item}>{item}</MenuItem>
                ))}
            </Select>
            {categories.map((item: string) => (
                <Button
                    key={item}
                    variant='contained'
                    data-id={item}
                    onClick={handleCategoryClick}
                >
                    {item}
                </Button>
            ))}
            <TextField
                fullWidth
                id="standard-basic" label="Search..."
                variant="standard"
                value={search}
                onChange={handleTextChange}
                sx={{ mt: 2 }}
            />
        </Box >
    )
}

export default SearchForm;