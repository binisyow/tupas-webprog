import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 80 },
  { field: 'firstName', headerName: 'First name', width: 150 },
  { field: 'lastName', headerName: 'Last name', width: 150 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    sortable: false,
    width: 200,
    valueGetter: (_, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
  { field: 'role', headerName: 'Role', width: 160 },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, role: 'Viewer' },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42, role: 'Editor' },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45, role: 'Reviewer' },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16, role: 'Viewer' },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 30, role: 'Admin' },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150, role: 'Contributor' },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44, role: 'Viewer' },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36, role: 'Editor' },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65, role: 'Viewer' },
];

const UsersPage = () => {
  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" fontWeight={800}>
          Users
        </Typography>
        <Typography color="text.secondary">
          User list table implemented with the MUI X Data Grid component.
        </Typography>
      </Box>

      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Box sx={{ height: 520, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default UsersPage;
