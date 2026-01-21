import { Box, Chip, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface ResultsProps {
  data: RunDataType[]
}
export default function Results(props: ResultsProps) {
  const { data } = props
  if (data.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
        No results.
      </Typography>
    )
  }
  return (
    <>
      <TableContainer component={Paper} variant="outlined" sx={{ maxHeight: 520 }}>
        <Table aria-label="Results table" stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Time</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Year</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Category</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {data.map((row) => (
              <TableRow key={row.name + row.time + row.year} hover>
                <TableCell component="th" scope="row">{row.name}</TableCell>
                <TableCell align="right">{row.time}</TableCell>
                <TableCell align="right">{row.year}</TableCell>
                <TableCell align="right">
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Chip label={row.category} size="small" variant="outlined" />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
