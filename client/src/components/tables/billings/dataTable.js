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

import { Typography} from '@mui/material';

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

  const handleUpdateClick = (billing) => {
    navigate('/edit-billing', { state: { billingId: billing._id } }); // Pass billing ID via state
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
        <Button variant="outlined" size="small" startIcon={<AddIcon />} onClick={() => navigate('/add-billing')} >
          Add Billing
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
    { field: 'number', headerName: 'Number', width: 130 },
    { field: 'status', headerName: 'Status', width: 130 },
    { field: 'description', headerName: 'Description', width: 130 },
    {
  field: 'updatedAt',
  headerName: 'Last Modified',
  width: 180,
  
},
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
        const token = localStorage.getItem('token');
        const userEnv = localStorage.getItem('userEnv'); // Retrieve userEnv
  
        if (!userEnv) {
          console.warn("User environment (userEnv) is not set.");
          return;
        }
  
        // Define the branch based on userEnv
        let branch;
        if (userEnv === "DEV") {
          branch = "New_DevCI_Draft"; // Replace with the actual DEV branch name
        } 
        else if (userEnv === "UAT") {
          branch = "UAT_branch";
        }
        else {
          branch = "Draft_tests_branch"; // Use userEnv as branch name for other environments
        }
  
        console.log("Fetching billings for branch:", branch);
        const response = await axios.get(`${backLink}/billings/billingsByBranch/${branch}`, {
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
    <Box sx={{ padding: '20px' }}>
    {loading ? (
      <Typography>Loading...</Typography>
    ) : (
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
       )}
        </Box>
  );
}
