import { Container } from '@mui/material';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';

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
    const handleRowClick = (params: GridRowParams) => {
        console.log(params)
    }

    const columns: GridColDef[] = [
        { field: 'Name', headerName: 'Name', width: 180 },
        { field: 'Time', headerName: 'Time', width: 80 },
        { field: 'Category', headerName: 'Category', width: 80 },
        { field: 'Year', headerName: 'Year', width: 80 },

    ];

    return (
        <div style={{ display: 'flex', height: '100%', minHeight: '200px' }}>
            <div style={{ flexGrow: 1 }}>
                <DataGrid
                    rows={dataWithID}
                    columns={columns}
                    pageSize={50}
                    onRowClick={handleRowClick}
                />
            </div>
        </div>
    )
}

export default Results

