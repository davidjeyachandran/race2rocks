import { Container } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface PropTypes {
    data: {
        Name: string;
        Time: string;
        Category: string;
        Year: number
    }[]
}

function Results({ data }: PropTypes) {

    const dataWithID = data.map((item) => ({ ...item, id: (item.Name + item.Time + item.Year) }))

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 1 },
        { field: 'Name', headerName: 'Name', width: 150 },
        { field: 'Time', headerName: 'Time', width: 90 },
        { field: 'Category', headerName: 'Category', width: 100 },
        { field: 'Year', headerName: 'Category', width: 80 },

    ];

    return (
        <Container sx={{ height: '600px' }}>
            <DataGrid
                rows={dataWithID}
                columns={columns}
                pageSize={30}
                rowsPerPageOptions={[21]}
            />
        </Container>
    )
}

export default Results

