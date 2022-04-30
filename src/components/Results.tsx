import { useState } from 'react'
import { Container } from '@mui/material';
import { DataGrid, GridColDef, GridRowParams, MuiEvent } from '@mui/x-data-grid';

interface PropTypes {
    data: {
        Name: string;
        Time: string;
        Category: string;
        Year: number
    }[]
}

function Results({ data }: PropTypes) {
    const [pageSize, setPageSize] = useState(20);

    const dataWithID = data.map((item) => ({ ...item, id: (item.Name + item.Time + item.Year) }))
    const handleRowClick = (params: GridRowParams) => {
        console.log(params)
    }

    const handlePageSizeChange = (pageSize: number) => {
        setPageSize(pageSize);

    };


    const columns: GridColDef[] = [
        { field: 'Name', headerName: 'Name', width: 210 },
        { field: 'Time', headerName: 'Time', width: 100 },
        { field: 'Category', headerName: 'Category', width: 100 },
        { field: 'Year', headerName: 'Year', width: 80 },

    ];

    return (
        <Container sx={{ height: '800px' }}>
            <DataGrid
                sx={{
                    ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows": {
                        marginBottom: 0,
                    }
                }}
                rows={dataWithID}
                columns={columns}
                pageSize={pageSize}
                rowsPerPageOptions={[20, 50, 100]}
                onRowClick={handleRowClick}
                onPageSizeChange={handlePageSizeChange}
            />
        </Container>
    )
}

export default Results

