import type { ChangeEvent, MouseEvent } from 'react'
import { Box, Paper, Slider, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'

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

    const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        onSearchChange(event.target.value)
    }

    const handleCategoryChange = (_event: MouseEvent<HTMLElement>, nextValue: string | null) => {
        onCategoryChange(nextValue ?? 'All')
    }

    // years is ['All', '2012', '2013', …]; the slider scrubs through editions by index.
    const yearIndex = Math.max(0, years.indexOf(year))
    const yearLabel = (index: number) => (years[index] === 'All' ? 'All years' : years[index])

    const handleYearSlide = (_event: Event, next: number | number[]) => {
        const index = Array.isArray(next) ? next[0] : next
        onYearChange(years[index] ?? 'All')
    }

    return (
        <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
            <Stack spacing={2}>
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

                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 0.5 }}>
                        <Typography variant="caption" color="text.secondary">
                            Year
                        </Typography>
                        <Typography sx={{ fontWeight: 700 }}>
                            {year === 'All' ? 'All years' : year}
                        </Typography>
                    </Box>
                    <Box sx={{ px: 1 }}>
                        <Slider
                            aria-label="Year"
                            value={yearIndex}
                            min={0}
                            max={Math.max(0, years.length - 1)}
                            step={1}
                            marks
                            color="secondary"
                            valueLabelDisplay="auto"
                            valueLabelFormat={yearLabel}
                            onChange={handleYearSlide}
                            disabled={years.length <= 1}
                        />
                    </Box>
                </Box>

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

export default SearchForm
