import type { ChangeEvent, MouseEvent } from 'react'
import { useState } from 'react'
import { FormControl, InputLabel, MenuItem, Paper, Stack, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material'
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
    const [category, setCategory] = useState('All')
    const [search, setSearch] = useState('');

    const handleChangeSelect = (event: SelectChangeEvent) => {
        const year: number = isNaN(parseInt(event.target.value)) ? -1 : parseInt(event.target.value)
        setYear(event.target.value)
        filterYear(year)
        setSearch('')
        setCategory('All')
    }

    const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        const name: string = event.target.value
        setSearch(name)
        filterName(name)
        setYear('All')
        setCategory('All')
    }

    const handleCategoryChange = (_event: MouseEvent<HTMLElement>, nextValue: string | null) => {
        const value = nextValue ?? 'All'
        setCategory(value)
        filterCategory(value === 'All' ? '' : value)
        setSearch('')
        setYear('All')
    }

    return (
        <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
            <Stack spacing={2}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                        fullWidth
                        id="search"
                        label="Search"
                        placeholder="Start typing a name…"
                        variant="outlined"
                        size="small"
                        value={search}
                        onChange={handleTextChange}
                    />
                    <FormControl fullWidth size="small">
                        <InputLabel id="year-label">Year</InputLabel>
                        <Select
                            fullWidth
                            labelId="year-label"
                            id="year"
                            value={year}
                            label="Year"
                            onChange={handleChangeSelect}
                        >
                            {years && years.length > 0 && years.map((item: string) => (
                                <MenuItem key={item} value={item}>{item}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>

                <ToggleButtonGroup
                    value={category}
                    exclusive
                    onChange={handleCategoryChange}
                    size="small"
                    sx={{ flexWrap: 'wrap' }}
                >
                    {categories.map((item: string) => (
                        <ToggleButton key={item} value={item}>
                            {item}
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>
            </Stack>
        </Paper>
    )
}

export default SearchForm;