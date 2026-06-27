import type { MouseEvent } from 'react'
import { Box, Paper, Slider, Stack, ToggleButton, ToggleButtonGroup, Typography, useMediaQuery, useTheme } from '@mui/material'

interface FiltersProps {
    years: string[]
    categories: string[]
    value: {
        year: string
        category: string
    }
    onYearChange: (year: string) => void
    onCategoryChange: (category: string) => void
}

export default function Filters(props: FiltersProps) {
    const { years, categories, value, onYearChange, onCategoryChange } = props
    const { year, category } = value
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    const handleCategoryChange = (_event: MouseEvent<HTMLElement>, nextValue: string | null) => {
        onCategoryChange(nextValue ?? 'All')
    }

    // years is ['All', '2012', '2013', …]; the slider scrubs through editions by index.
    const yearIndex = Math.max(0, years.indexOf(year))
    const lastIndex = Math.max(0, years.length - 1)
    const yearLabel = (index: number) => (years[index] === 'All' ? 'All years' : years[index])

    // A dot on every stop; year labels on every edition (desktop) or every other (mobile).
    const labelEvery = isMobile ? 2 : 1
    const marks = years.map((value, index) => {
        let label: string | undefined
        if (index === 0) label = 'All'
        else if ((index - 1) % labelEvery === 0 || index === lastIndex) label = `’${value.slice(2)}`
        return { value: index, label }
    })

    const handleYearSlide = (_event: Event, next: number | number[]) => {
        const index = Array.isArray(next) ? next[0] : next
        onYearChange(years[index] ?? 'All')
    }

    return (
        <Paper variant="outlined" sx={{ p: 2 }}>
            <Stack spacing={2}>
                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 0.5 }}>
                        <Typography variant="caption" color="text.secondary">
                            Browse by year
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
                            max={lastIndex}
                            step={1}
                            marks={marks}
                            color="secondary"
                            valueLabelDisplay="auto"
                            valueLabelFormat={yearLabel}
                            onChange={handleYearSlide}
                            disabled={years.length <= 1}
                            sx={{ '& .MuiSlider-markLabel': { fontSize: 11 } }}
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
