import { Box, Button, IconButton, Paper, TextField } from '@mui/material';
import React, { useState } from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';

interface PropTypes {
    years: string[];
    setYear(year: (number | undefined)): void;
    filterName: (name: string) => void;
    categories: string[];
    setCategory(category: (string | undefined)): void
}

function SearchForm({ years, setYear, filterName, categories, setCategory }: PropTypes) {

    const [name, setName] = useState('');

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        let name = e.target.value
        setName(name)
        filterName(name)
    }

    function clearName() {
        setName('')
    }

    function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        const year: string = e.currentTarget.dataset.id || ''
        setName('')
        setYear(parseInt(year))
    }

    function handleClickCategories(e: React.MouseEvent<HTMLButtonElement>) {
        console.log(e);
        let category = e.currentTarget.dataset.id
        setName('')
        setCategory(category)
    }

    // onClick = { handleClickCategories } key = { item } data - id={ item }
    return (
        <Paper elevation={1} sx={{ padding: 1, marginBottom: 1 }}>
            <Box display="flex" marginY={2} flexWrap='wrap' justifyContent="space-between" border={0}>
                {years.map(item =>
                    <Button key={item} variant="outlined" size="large" data-id={item} onClick={handleClick} sx={{ mr: 1, mb: 1 }}>
                        {item}
                    </Button>
                )}
            </Box>
            <Box display="flex" justifyContent="space-between" marginBottom={2}>
                {categories.map(item =>
                    <Button key={item} variant="contained" onClick={handleClickCategories} data-id={item}>
                        {item}
                    </Button>
                )}
            </Box>
            <TextField
                variant="outlined"
                value={name}
                onChange={handleChange}
                placeholder="Search..."
                InputProps={{
                    startAdornment: <SearchIcon fontSize="small" />,
                    endAdornment: (
                        <IconButton
                            title="Clear"
                            aria-label="Clear"
                            size="small"
                            style={{ visibility: name ? 'visible' : 'hidden' }}
                            onClick={clearName}
                        >
                            <ClearIcon fontSize="small" />
                        </IconButton>
                    ),
                }}
            />
        </Paper>
    )
}

export default SearchForm
