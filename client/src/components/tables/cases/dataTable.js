import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';

const backLink = "http://localhost:5000";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function DataTable() {
  const navigate = useNavigate();

  const handleUpdateClick = (selectedCase) => {
    navigate('/edit-case', { state: { caseId: selectedCase._id } }); // Pass case ID via state
};

  // Custom Toolbar component
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector
          slotProps={{ tooltip: { title: 'Change density' } }}
        />
        <Box sx={{ flexGrow: 1 }} />
        {/* Button to open modal */}
        <Button variant="outlined" size="small" startIcon={<AddIcon />} onClick={() => navigate('/add-case')} >
          Add Case
        </Button>
        <GridToolbarExport
          slotProps={{
            tooltip: { title: 'Export data' },
            button: { variant: 'outlined' },
          }}
        />
      </GridToolbarContainer>
    );
  }

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const columns = [
    { field: 'type', headerName: 'Type', width: 130 },
    { field: 'identifier', headerName: 'Identifier', width: 130 },
    { field: 'status', headerName: 'Status', width: 130 },
    { field: 'status_reason', headerName: 'Status Reason', width: 130 },
    { field: 'brand', headerName: 'Brand', width: 130 },
    { field: 'inflight', headerName: 'Inflight', type: 'boolean', width: 130 },
    { field: 'description', headerName: 'Description', width: 130 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 210,
      renderCell: (params) => (
        <Stack spacing={1} sx={{ width: 1, py: 1 }}>
          <Button
            variant="text"
            size="small"
            startIcon={<EditIcon />}
            onClick={() => handleUpdateClick(params.row)}
          />
        </Stack>
      ),
    },
  ];

  const responsiveColumns = columns.map((column) => ({
    ...column,
    width: isSmallScreen ? 'auto' : 150,
    flex: 1,
  }));

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Back link : " + backLink);
        
        const token = localStorage.getItem('token');
        const response = await axios.get(`${backLink}/cases/all-cases`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRows(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Paper sx={{ height: '100%', width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={responsiveColumns}
          slots={{
            toolbar: CustomToolbar,
          }}
          loading={loading}
          pageSize={isSmallScreen ? 5 : 7}
          rowsPerPageOptions={[5, 10]}
          getRowId={(row) => row.type}
          sx={{ border: 0 }}
        />
      </Paper>
    </>
  );
}
