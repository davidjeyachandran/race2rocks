import type { ChangeEvent } from 'react'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { SearchIcon } from './icons'

interface SearchBarProps {
    value: string
    onChange: (search: string) => void
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value)
    }

    return (
        <TextField
            fullWidth
            id="search"
            placeholder="Find a runner — searches every year"
            value={value}
            onChange={handleChange}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                ),
                endAdornment: value ? (
                    <InputAdornment position="end">
                        <IconButton aria-label="Clear search" size="small" edge="end" onClick={() => onChange('')}>
                            <span aria-hidden style={{ fontSize: 18, lineHeight: 1 }}>×</span>
                        </IconButton>
                    </InputAdornment>
                ) : null,
            }}
            sx={{
                bgcolor: 'background.paper',
                borderRadius: 3,
                '& .MuiOutlinedInput-root': { borderRadius: 3 },
            }}
        />
    )
}
