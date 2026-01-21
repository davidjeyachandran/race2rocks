import type { ChangeEvent, MouseEvent } from 'react'
import { FormControl, InputLabel, MenuItem, Paper, Stack, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface SearchFormProps {
    years: string[]
    categories: string[]
    value: {
        search: string
        year: string
        category: string
    }
    onSearchChange: (search: string) => void
    onYearChange: (year: string) => void
    onCategoryChange: (category: string) => void
}

function SearchForm(props: SearchFormProps) {
    const { years, categories, value, onSearchChange, onYearChange, onCategoryChange } = props
    const { search, year, category } = value

    const handleChangeSelect = (event: SelectChangeEvent) => {
        onYearChange(event.target.value)
    }

    const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        onSearchChange(event.target.value)
    }

    const handleCategoryChange = (_event: MouseEvent<HTMLElement>, nextValue: string | null) => {
        onCategoryChange(nextValue ?? 'All')
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